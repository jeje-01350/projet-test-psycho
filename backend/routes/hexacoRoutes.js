const express = require('express');
const router = express.Router();
const {
  createHexacoResult,
  getHexacoResult,
  getAllHexacoResults
} = require('../controllers/hexacoController');

// Routes pour le test HEXACO
router.post('/save', createHexacoResult);
router.get('/:id', getHexacoResult);
router.get('/', getAllHexacoResults);

module.exports = router; 