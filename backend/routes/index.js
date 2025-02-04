const express = require("express");
const personalityTestRoutes = require('./personalityTest');
const bigFiveRoutes = require('./bigFive');

const router = express.Router();

router.use("/personality-test", personalityTestRoutes);
router.use("/call-modjo", require("./callModjo"));
router.use('/bigfive', bigFiveRoutes);

module.exports = router;
