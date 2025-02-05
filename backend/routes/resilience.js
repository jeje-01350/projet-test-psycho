const express = require('express');
const router = express.Router();
const resilienceController = require('../controllers/resilienceController');

/**
 * @route POST /api/resilience/save
 * @desc Enregistre les résultats d'un test de résilience
 * @access Public
 */
router.post('/save', resilienceController.saveResilienceResults);

/**
 * @route GET /api/resilience/results
 * @desc Récupère tous les résultats des tests de résilience
 * @access Public
 */
router.get('/results', resilienceController.getAllResults);

module.exports = router; 