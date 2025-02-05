const mongoose = require('mongoose');

const DiscResultSchema = new mongoose.Schema({
  scores: {
    D: { type: Number, required: true }, // Dominance
    I: { type: Number, required: true }, // Influence
    S: { type: Number, required: true }, // Stabilité
    C: { type: Number, required: true }  // Conformité
  },
  primaryStyle: { type: String, required: true }, // Style dominant (D, I, S ou C)
  secondaryStyle: { type: String, required: true }, // Style secondaire
  userAnswers: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  testDuration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const DiscResult = mongoose.model('DiscResult', DiscResultSchema);

module.exports = DiscResult; 