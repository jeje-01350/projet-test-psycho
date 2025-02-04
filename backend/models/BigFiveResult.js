const mongoose = require('mongoose');

const BigFiveResultSchema = new mongoose.Schema({
  scores: {
    O: { type: Number, required: true }, // Ouverture
    C: { type: Number, required: true }, // Conscience
    E: { type: Number, required: true }, // Extraversion
    A: { type: Number, required: true }, // Agréabilité
    N: { type: Number, required: true }  // Névrosisme
  },
  userAnswers: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  testDuration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BigFiveResult', BigFiveResultSchema); 