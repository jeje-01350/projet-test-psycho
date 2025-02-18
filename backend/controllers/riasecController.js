const RiasecResult = require('../models/RiasecResult');

// Soumettre un nouveau test RIASEC
exports.submitTest = async (req, res) => {
  try {
    const {
      responses,
      testDuration,
      startTime,
      endTime
    } = req.body;

    // Créer une nouvelle instance de résultat
    const result = new RiasecResult({
      responses,
      metadata: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        duration: testDuration
      }
    });

    // Calculer les scores
    const riasecScores = result.calculateRiasecScores();
    const tipiScores = result.calculateTipiScores();
    const vocabularyScore = result.calculateVocabularyScore();

    // Interpréter les résultats
    const interpretation = result.interpretResults();

    // Mettre à jour les scores et l'interprétation
    result.scores = {
      riasec: riasecScores,
      tipi: tipiScores,
      vocabulary: vocabularyScore
    };
    result.interpretation = interpretation;

    // Sauvegarder le résultat
    await result.save();

    // Envoyer la réponse
    res.status(201).json({
      riasecScores,
      tipiScores,
      vocabularyScore,
      ...interpretation
    });
  } catch (error) {
    console.error('Erreur lors de la soumission du test:', error);
    res.status(500).json({
      message: 'Erreur lors de la soumission du test',
      error: error.message
    });
  }
};

// Récupérer les résultats d'un utilisateur
exports.getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await RiasecResult.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    if (!results.length) {
      return res.status(404).json({
        message: 'Aucun résultat trouvé pour cet utilisateur'
      });
    }

    res.json(results);
  } catch (error) {
    console.error('Erreur lors de la récupération des résultats:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des résultats',
      error: error.message
    });
  }
};

// Récupérer un résultat spécifique
exports.getResult = async (req, res) => {
  try {
    const { resultId } = req.params;
    const result = await RiasecResult.findById(resultId);

    if (!result) {
      return res.status(404).json({
        message: 'Résultat non trouvé'
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Erreur lors de la récupération du résultat:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération du résultat',
      error: error.message
    });
  }
};

// Supprimer un résultat
exports.deleteResult = async (req, res) => {
  try {
    const { resultId } = req.params;
    const result = await RiasecResult.findByIdAndDelete(resultId);

    if (!result) {
      return res.status(404).json({
        message: 'Résultat non trouvé'
      });
    }

    res.json({
      message: 'Résultat supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du résultat:', error);
    res.status(500).json({
      message: 'Erreur lors de la suppression du résultat',
      error: error.message
    });
  }
};

// Obtenir des statistiques agrégées
exports.getStatistics = async (req, res) => {
  try {
    const stats = await RiasecResult.aggregate([
      {
        $group: {
          _id: null,
          totalTests: { $sum: 1 },
          avgDuration: { $avg: '$metadata.duration' },
          dominantTypes: {
            $push: {
              $arrayElemAt: ['$interpretation.dominantTypes', 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalTests: 1,
          avgDuration: 1,
          dominantTypes: {
            $reduce: {
              input: '$dominantTypes',
              initialValue: {},
              in: {
                $mergeObjects: [
                  '$$value',
                  {
                    $cond: [
                      { $eq: ['$$this', null] },
                      {},
                      {
                        $arrayToObject: [[
                          {
                            k: '$$this',
                            v: { $add: [{ $ifNull: [{ $getField: { field: '$$this', input: '$$value' } }, 0] }, 1] }
                          }
                        ]]
                      }
                    ]
                  }
                ]
              }
            }
          }
        }
      }
    ]);

    res.json(stats[0] || {
      totalTests: 0,
      avgDuration: 0,
      dominantTypes: {}
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message
    });
  }
}; 