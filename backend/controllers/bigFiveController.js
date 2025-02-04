const BigFiveResult = require('../models/BigFiveResult');

/**
 * Contrôleur pour gérer les opérations liées au test Big Five
 */
const bigFiveController = {
  /**
   * Enregistre les résultats d'un test Big Five
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async saveBigFiveResults(req, res) {
    try {
      const {
        scores,
        userAnswers,
        testDuration
      } = req.body;

      // Créer un nouveau résultat
      const newResult = new BigFiveResult({
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
   * Récupère tous les résultats des tests Big Five
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async getAllResults(req, res) {
    try {
      const results = await BigFiveResult.find().sort({ createdAt: -1 });
      
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
    O: {
      high: "Vous êtes une personne curieuse et créative, toujours ouverte aux nouvelles expériences.",
      low: "Vous préférez la stabilité et les approches traditionnelles."
    },
    C: {
      high: "Vous êtes organisé et méthodique, avec un fort sens des responsabilités.",
      low: "Vous adoptez une approche plus décontractée et flexible de la vie."
    },
    E: {
      high: "Vous êtes sociable et énergique, appréciant les interactions sociales.",
      low: "Vous appréciez la solitude et la réflexion personnelle."
    },
    A: {
      high: "Vous êtes empathique et coopératif, privilégiant l'harmonie dans les relations.",
      low: "Vous êtes direct et franc dans vos interactions avec les autres."
    },
    N: {
      high: "Vous êtes sensible aux émotions et réactif aux situations stressantes.",
      low: "Vous restez calme et stable face aux situations difficiles."
    }
  };

  return Object.entries(scores).reduce((acc, [dimension, score]) => {
    acc[dimension] = score > 30 ? descriptions[dimension].high : descriptions[dimension].low;
    return acc;
  }, {});
}

module.exports = bigFiveController; 