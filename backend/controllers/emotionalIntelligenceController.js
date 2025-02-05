const EmotionalIntelligenceResult = require('../models/EmotionalIntelligenceResult');

const emotionalIntelligenceController = {
  async saveResults(req, res) {
    try {
      const {
        scores,
        userAnswers,
        testDuration
      } = req.body;

      const newResult = new EmotionalIntelligenceResult({
        scores,
        userAnswers,
        testDuration
      });

      await newResult.save();

      const resultDescriptions = generateResultDescriptions(scores);

      res.status(201).json({
        success: true,
        message: "Résultats enregistrés avec succès",
        data: {
          scores,
          descriptions: resultDescriptions
        }
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des résultats:', error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de l'enregistrement des résultats",
        error: error.message
      });
    }
  },

  async getAllResults(req, res) {
    try {
      const results = await EmotionalIntelligenceResult.find().sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        data: results
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des résultats:', error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des résultats",
        error: error.message
      });
    }
  }
};

function generateResultDescriptions(scores) {
  const descriptions = {
    SA: {
      high: "Vous avez une excellente conscience de vos émotions et de leur impact sur votre comportement.",
      low: "Vous pourriez développer davantage votre conscience émotionnelle personnelle."
    },
    EM: {
      high: "Vous gérez très bien vos émotions et savez les réguler efficacement.",
      low: "La gestion de vos émotions pourrait être améliorée pour plus d'efficacité."
    },
    SOA: {
      high: "Vous êtes très attentif aux émotions des autres et à la dynamique sociale.",
      low: "Développer votre conscience des émotions des autres pourrait enrichir vos interactions."
    },
    RM: {
      high: "Vous excellez dans la gestion des relations et la communication interpersonnelle.",
      low: "Améliorer vos compétences en gestion des relations pourrait enrichir vos interactions."
    },
    DM: {
      high: "Vous prenez des décisions équilibrées en tenant compte des aspects émotionnels.",
      low: "Intégrer davantage les aspects émotionnels dans vos décisions pourrait les enrichir."
    }
  };

  return Object.entries(scores).reduce((acc, [dimension, score]) => {
    acc[dimension] = score > 6 ? descriptions[dimension].high : descriptions[dimension].low;
    return acc;
  }, {});
}

module.exports = emotionalIntelligenceController; 