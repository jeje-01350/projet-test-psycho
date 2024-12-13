const express = require("express");

const router = express.Router();

router.use("/personality-test", require("./personalityTest"));
router.use("/call-modjo", require("./callModjo"));

module.exports = router;
