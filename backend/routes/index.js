const express = require("express");

const router = express.Router();

router.use("/personality-test", require("./personalityTest"));

module.exports = router;
