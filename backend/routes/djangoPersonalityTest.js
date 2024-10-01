const express = require('express');
const router = express.Router();
const djangoPersonalityTestController = require('../controllers/djangoPersonalityTestController');

router.post('/save', djangoPersonalityTestController.sauvegarderResultat);

module.exports = router;
