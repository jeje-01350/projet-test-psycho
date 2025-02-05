const mongoose = require('mongoose');

const EmotionalIntelligenceResultSchema = new mongoose.Schema({
  scores: {
    SA: { type: Number, required: true }, // Self Awareness
    EM: { type: Number, required: true }, // Emotion Management
    SOA: { type: Number, required: true }, // Social Awareness
    RM: { type: Number, required: true }, // Relationship Management
    DM: { type: Number, required: true }  // Decision Making
  },
  userAnswers: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  testDuration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const EmotionalIntelligenceResult = mongoose.model('EmotionalIntelligenceResult', EmotionalIntelligenceResultSchema);

module.exports = EmotionalIntelligenceResult; 