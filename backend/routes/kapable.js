const express = require('express');
const router = express.Router();
const kapableController = require('../controllers/kapableController');

router.post('/save', kapableController.sauvegarderResultat);

module.exports = router;
