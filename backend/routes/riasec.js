const express = require('express');
const router = express.Router();
const riasecController = require('../controllers/riasecController');

router.post('/save', riasecController.sauvegarderResultat);

module.exports = router;
