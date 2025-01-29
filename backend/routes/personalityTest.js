const express = require('express');
const router = express.Router();
const personalityTestController = require('../controllers/personalityTestController');

router.post('/save', personalityTestController.savePersonalityTestResult);
router.get('/checkHsObjectId/:hs_object_id', personalityTestController.checkHsObjectId);
router.post('/hubspot', personalityTestController.saveHubspotTest);

module.exports = router;
