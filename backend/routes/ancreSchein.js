const express = require('express');
const router = express.Router();
const ancreScheinController = require('../controllers/ancreScheinController');

router.post('/save', ancreScheinController.sauvegarderResultat);

module.exports = router;
