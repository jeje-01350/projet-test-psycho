const AmbiResult = require('../models/AmbiResult');

// Créer un nouveau résultat de test
exports.createAmbiResult = async (req, res) => {
  try {
    const { scores, userAnswers, testDuration, averageResponseTime } = req.body;

    // Validation des données
    if (!scores || !userAnswers || !testDuration || !averageResponseTime) {
      return res.status(400).json({
        success: false,
        message: 'Données manquantes pour le test AMBI'
      });
    }

    // Vérification de la qualité des réponses
    if (averageResponseTime < 500) { // Moins de 500ms par question
      return res.status(400).json({
        success: false,
        message: 'Les réponses semblent avoir été données trop rapidement'
      });
    }

    if (testDuration < 181) { // Moins de 181 secondes au total
      return res.status(400).json({
        success: false,
        message: 'Le test a été complété trop rapidement'
      });
    }

    // Création du résultat
    const result = await AmbiResult.create({
      scores,
      userAnswers,
      testDuration,
      averageResponseTime
    });

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Erreur lors de la création du résultat AMBI:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la sauvegarde du résultat'
    });
  }
};

// Récupérer un résultat spécifique
exports.getAmbiResult = async (req, res) => {
  try {
    const result = await AmbiResult.findById(req.params.id);
    
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
    console.error('Erreur lors de la récupération du résultat AMBI:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du résultat'
    });
  }
};

// Récupérer tous les résultats (avec pagination)
exports.getAllAmbiResults = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const results = await AmbiResult.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await AmbiResult.countDocuments();

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
    console.error('Erreur lors de la récupération des résultats AMBI:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des résultats'
    });
  }
}; 