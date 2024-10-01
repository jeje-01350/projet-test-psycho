const express = require('express');
const router = express.Router();
const mindFlareController = require('../controllers/mindFlareController');

router.post('/save', mindFlareController.saveResult);

module.exports = router;
