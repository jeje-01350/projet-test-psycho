const ResilienceResult = require('../models/ResilienceResult');

/**
 * Contrôleur pour gérer les opérations liées au test de résilience
 */
const resilienceController = {
  /**
   * Enregistre les résultats d'un test de résilience
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async saveResilienceResults(req, res) {
    try {
      const {
        scores,
        userAnswers,
        testDuration
      } = req.body;

      // Créer un nouveau résultat
      const newResult = new ResilienceResult({
        scores,
        userAnswers,
        testDuration
      });

      // Sauvegarder dans la base de données
      await newResult.save();

      // Générer les descriptions des résultats
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

  /**
   * Récupère tous les résultats des tests de résilience
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async getAllResults(req, res) {
    try {
      const results = await ResilienceResult.find().sort({ createdAt: -1 });
      
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

/**
 * Génère des descriptions personnalisées basées sur les scores
 * @param {Object} scores - Les scores du test
 * @returns {Object} Descriptions personnalisées pour chaque dimension
 */
function generateResultDescriptions(scores) {
  const descriptions = {
    AD: {
      high: "Vous démontrez une excellente capacité d'adaptation face aux changements.",
      low: "Vous pourriez bénéficier de développer votre flexibilité face aux changements."
    },
    PR: {
      high: "Vous excellez dans la résolution de problèmes et la recherche de solutions.",
      low: "Vous pourriez améliorer vos stratégies de résolution de problèmes."
    },
    EM: {
      high: "Vous gérez vos émotions de manière équilibrée et constructive.",
      low: "La gestion des émotions est un domaine où vous pourriez progresser."
    },
    SS: {
      high: "Vous savez bien utiliser votre réseau de soutien social.",
      low: "Développer votre réseau de soutien pourrait renforcer votre résilience."
    },
    SC: {
      high: "Vous avez une forte confiance en vos capacités.",
      low: "Renforcer votre confiance en vous pourrait améliorer votre résilience."
    }
  };

  return Object.entries(scores).reduce((acc, [dimension, score]) => {
    acc[dimension] = score > 6 ? descriptions[dimension].high : descriptions[dimension].low;
    return acc;
  }, {});
}

module.exports = resilienceController; 