const express = require('express');
const router = express.Router();
const callModjo = require('../controllers/callModjo');

router.post('/save', callModjo.saveModjoCall);
router.get('/get/:hs_object_id', callModjo.getModjoCallById);

module.exports = router;
