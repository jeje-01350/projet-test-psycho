const HexacoResult = require('../models/HexacoResult');

// Créer un nouveau résultat de test
exports.createHexacoResult = async (req, res) => {
  try {
    const { scores, userAnswers, testDuration } = req.body;

    // Validation des données
    if (!scores || !userAnswers || !testDuration) {
      return res.status(400).json({
        success: false,
        message: 'Données manquantes pour le test HEXACO'
      });
    }

    // Création du résultat
    const result = await HexacoResult.create({
      scores,
      userAnswers,
      testDuration
    });

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Erreur lors de la création du résultat HEXACO:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la sauvegarde du résultat'
    });
  }
};

// Récupérer un résultat spécifique
exports.getHexacoResult = async (req, res) => {
  try {
    const result = await HexacoResult.findById(req.params.id);
    
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
    console.error('Erreur lors de la récupération du résultat HEXACO:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du résultat'
    });
  }
};

// Récupérer tous les résultats (avec pagination)
exports.getAllHexacoResults = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const results = await HexacoResult.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await HexacoResult.countDocuments();

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
    console.error('Erreur lors de la récupération des résultats HEXACO:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des résultats'
    });
  }
}; 