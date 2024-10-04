const express = require('express');
const router = express.Router();
const papiController = require('../controllers/papiController');

router.post('/save', papiController.sauvegarderResultat);

module.exports = router;
