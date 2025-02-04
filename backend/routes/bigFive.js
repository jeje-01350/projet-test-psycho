const express = require('express');
const router = express.Router();
const bigFiveController = require('../controllers/bigFiveController');

/**
 * @route POST /api/bigfive/save
 * @desc Enregistre les résultats d'un test Big Five
 * @access Public
 */
router.post('/save', bigFiveController.saveBigFiveResults);

/**
 * @route GET /api/bigfive/results
 * @desc Récupère tous les résultats des tests Big Five
 * @access Public
 */
router.get('/results', bigFiveController.getAllResults);

module.exports = router; 