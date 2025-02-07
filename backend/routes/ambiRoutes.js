const express = require('express');
const router = express.Router();
const {
  createAmbiResult,
  getAmbiResult,
  getAllAmbiResults
} = require('../controllers/ambiController');

// Routes pour le test AMBI
router.post('/save', createAmbiResult);
router.get('/:id', getAmbiResult);
router.get('/', getAllAmbiResults);

module.exports = router; 