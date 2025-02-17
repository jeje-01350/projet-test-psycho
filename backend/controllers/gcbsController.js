const GcbsResult = require('../models/GcbsResult');

// Créer un nouveau résultat de test
exports.createGcbsResult = async (req, res) => {
  try {
    const {
      gcbsScores,
      gcbsAnswers,
      tipiScores,
      tipiAnswers,
      vocabularyAnswers,
      timings
    } = req.body;

    // Validation des données
    if (!gcbsScores || !gcbsAnswers || !tipiScores || !tipiAnswers || 
        !vocabularyAnswers || !timings) {
      return res.status(400).json({
        success: false,
        message: 'Données manquantes pour le test GCBS'
      });
    }

    // Création du résultat
    const result = await GcbsResult.create({
      gcbsScores,
      gcbsAnswers,
      tipiScores,
      tipiAnswers,
      vocabularyAnswers,
      timings,
      technical: {
        country: req.headers['cf-ipcountry'] || 'Unknown'
      }
    });

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Erreur lors de la création du résultat GCBS:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la sauvegarde du résultat'
    });
  }
};

// Récupérer un résultat spécifique
exports.getGcbsResult = async (req, res) => {
  try {
    const result = await GcbsResult.findById(req.params.id);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Résultat non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du résultat GCBS:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du résultat'
    });
  }
};

// Récupérer tous les résultats (avec pagination)
exports.getAllGcbsResults = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const results = await GcbsResult.find()
      .sort({ 'technical.createdAt': -1 })
      .skip(skip)
      .limit(limit);

    const total = await GcbsResult.countDocuments();

    res.status(200).json({
      success: true,
      count: results.length,
      total,
      data: results,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des résultats GCBS:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des résultats'
    });
  }
}; 