const express = require("express");

const router = express.Router();

router.use("/question", require("./question"));
router.use("/answer", require("./answer"));
router.use("/personality-test", require("./personalityTest"));
router.use("/riasec", require("./riasec"));
router.use("/mindflare", require("./mindFlare"));
router.use("/bigfive", require("./bigfive"));
router.use("/django-test", require("./djangoPersonalityTest"));

module.exports = router;
