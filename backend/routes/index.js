const express = require("express");
const ambiRoutes = require('./ambiRoutes');
const gcbsRoutes = require('./gcbsRoutes');
const riasecRoutes = require('./riasecRoutes');
const router = express.Router();

router.use("/ambi", ambiRoutes);
router.use("/gcbs", gcbsRoutes);
router.use("/riasec", riasecRoutes);

module.exports = router;
