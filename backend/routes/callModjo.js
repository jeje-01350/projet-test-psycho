const express = require('express');
const router = express.Router();
const callModjo = require('../controllers/callModjo');

router.post('/save', callModjo.saveModjoCall);

module.exports = router;
