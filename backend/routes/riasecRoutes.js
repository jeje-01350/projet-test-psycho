const express = require('express');
const router = express.Router();
const riasecController = require('../controllers/riasecController');

// Route pour soumettre un nouveau test
router.post('/submit', riasecController.submitTest);

// Route pour obtenir un résultat spécifique
router.get('/result/:resultId', riasecController.getResult);

// Route pour obtenir des statistiques
router.get('/statistics', riasecController.getStatistics);

module.exports = router; 