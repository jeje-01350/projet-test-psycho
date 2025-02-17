const express = require("express");
const ambiRoutes = require('./ambiRoutes');
const gcbsRoutes = require('./gcbsRoutes');
const router = express.Router();

router.use("/ambi", ambiRoutes);
router.use("/gcbs", gcbsRoutes);




module.exports = router;
