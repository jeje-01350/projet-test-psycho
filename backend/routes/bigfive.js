const express = require('express');
const router = express.Router();
const bigfiveController = require('../controllers/bigfiveController');

router.post('/save', bigfiveController.sauvegarderResultat);

module.exports = router;
