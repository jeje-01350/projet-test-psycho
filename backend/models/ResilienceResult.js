const mongoose = require('mongoose');

const ResilienceResultSchema = new mongoose.Schema({
  scores: {
    AD: { type: Number, required: true }, // Adaptation
    PR: { type: Number, required: true }, // Problem Resolution
    EM: { type: Number, required: true }, // Emotional Management
    SS: { type: Number, required: true }, // Social Support
    SC: { type: Number, required: true }  // Self Confidence
  },
  userAnswers: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  testDuration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ResilienceResult = mongoose.model('ResilienceResult', ResilienceResultSchema);

module.exports = ResilienceResult; 