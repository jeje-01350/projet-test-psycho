const express = require("express");
const personalityTestRoutes = require('./personalityTest');
const bigFiveRoutes = require('./bigFive');
const resilienceRoutes = require('./resilience');
const emotionalIntelligenceRoutes = require('./emotionalIntelligence');
const router = express.Router();

router.use("/personality-test", personalityTestRoutes);
router.use("/bigfive", bigFiveRoutes);
router.use("/resilience", resilienceRoutes);
router.use("/emotional-intelligence", emotionalIntelligenceRoutes);
router.use("/call-modjo", require("./callModjo"));



module.exports = router;
