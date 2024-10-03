const express = require('express');
const router = express.Router();
const mbtiController = require('../controllers/mbtiController');

router.post('/save', mbtiController.sauvegarderResultat);

module.exports = router;
