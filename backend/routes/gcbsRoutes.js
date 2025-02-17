const express = require('express');
const router = express.Router();
const {
  createGcbsResult,
  getGcbsResult,
  getAllGcbsResults
} = require('../controllers/gcbsController');

// Routes pour le test GCBS
router.post('/save', createGcbsResult);
router.get('/:id', getGcbsResult);
router.get('/', getAllGcbsResults);

module.exports = router; 