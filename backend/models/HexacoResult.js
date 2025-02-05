const mongoose = require('mongoose');

const HexacoResultSchema = new mongoose.Schema({
  scores: {
    H: { type: Number, required: true }, // Honnêteté-Humilité
    E: { type: Number, required: true }, // Émotionnalité
    X: { type: Number, required: true }, // Extraversion
    A: { type: Number, required: true }, // Agréabilité
    C: { type: Number, required: true }, // Conscience
    O: { type: Number, required: true }  // Ouverture à l'expérience
  },
  userAnswers: [{
    question: { type: String, required: true },
    answer: { type: String, required: true },
    score: { type: Number, required: true }
  }],
  testDuration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Optimisation des performances avec des index
HexacoResultSchema.index({ createdAt: -1 });

const HexacoResult = mongoose.model('HexacoResult', HexacoResultSchema);

module.exports = HexacoResult; 