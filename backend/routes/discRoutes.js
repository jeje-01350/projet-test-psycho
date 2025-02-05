const express = require('express');
const router = express.Router();
const discController = require('../controllers/discController');

// Route pour sauvegarder les résultats du test DISC
router.post('/save', discController.saveResults);

// Route pour récupérer tous les résultats
router.get('/results', discController.getAllResults);

module.exports = router; 