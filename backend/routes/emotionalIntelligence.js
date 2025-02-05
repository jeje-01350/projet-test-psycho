const express = require('express');
const router = express.Router();
const emotionalIntelligenceController = require('../controllers/emotionalIntelligenceController');

/**
 * @route POST /api/emotional-intelligence/save
 * @desc Enregistre les résultats d'un test d'intelligence émotionnelle
 * @access Public
 */
router.post('/save', emotionalIntelligenceController.saveResults);

/**
 * @route GET /api/emotional-intelligence/results
 * @desc Récupère tous les résultats des tests d'intelligence émotionnelle
 * @access Public
 */
router.get('/results', emotionalIntelligenceController.getAllResults);

module.exports = router; 