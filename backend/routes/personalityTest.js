const express = require('express');
const router = express.Router();
const personalityTestController = require('../controllers/personalityTestController');

router.post('/save', personalityTestController.savePersonalityTestResult);
router.post('/hubspot', personalityTestController.saveHubspotTest);

module.exports = router;
