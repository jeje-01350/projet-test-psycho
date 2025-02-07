const mongoose = require('mongoose');

const AmbiResultSchema = new mongoose.Schema({
  scores: {
    E: { type: Number, required: true }, // Extraversion
    A: { type: Number, required: true }, // Agréabilité
    C: { type: Number, required: true }, // Conscience
    S: { type: Number, required: true }, // Stabilité émotionnelle
    O: { type: Number, required: true }  // Ouverture à l'expérience
  },
  userAnswers: [{
    question: { type: String, required: true },
    answer: { type: Number, required: true, min: 1, max: 7 }, // Score de 1 à 7
    dimension: { type: String, required: true },
    isReversed: { type: Boolean, required: true }
  }],
  testDuration: { type: Number, required: true },
  averageResponseTime: { type: Number, required: true }, // Temps moyen par question en ms
  createdAt: { type: Date, default: Date.now }
});

// Optimisation des performances avec des index
AmbiResultSchema.index({ createdAt: -1 });

const AmbiResult = mongoose.model('AmbiResult', AmbiResultSchema);

module.exports = AmbiResult; 