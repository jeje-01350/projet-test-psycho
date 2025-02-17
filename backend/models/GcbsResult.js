const mongoose = require('mongoose');

const GcbsResultSchema = new mongoose.Schema({
  // Scores GCBS
  gcbsScores: {
    RA: { type: Number, required: true }, // Raisonnement Analytique
    LP: { type: Number, required: true }, // Logique Pratique
    MF: { type: Number, required: true }, // Mode de Fonctionnement
    V: { type: Number, required: true }   // Validation
  },
  
  // Réponses GCBS détaillées
  gcbsAnswers: [{
    questionId: { type: String, required: true },
    answer: { type: Number, required: true }, // 1-5
    timeSpent: { type: Number, required: true }, // en ms
    orientation: { type: Number, required: true }, // 1 ou 2
    position: { type: Number, required: true } // position dans le test
  }],

  // Scores TIPI
  tipiScores: {
    E: { type: Number, required: true }, // Extraversion
    A: { type: Number, required: true }, // Agréabilité
    C: { type: Number, required: true }, // Conscience
    S: { type: Number, required: true }, // Stabilité émotionnelle
    O: { type: Number, required: true }  // Ouverture
  },

  // Réponses TIPI détaillées
  tipiAnswers: [{
    questionId: { type: Number, required: true },
    answer: { type: Number, required: true }, // 1-7
    timeSpent: { type: Number, required: true } // en ms
  }],

  // Checklist de vocabulaire
  vocabularyAnswers: [{
    wordId: { type: String, required: true },
    checked: { type: Boolean, required: true }
  }],

  // Temps passé
  timings: {
    introElapse: { type: Number, required: true },
    testElapse: { type: Number, required: true },
    surveyElapse: { type: Number, required: true }
  },

  // Informations techniques
  technical: {
    country: { type: String },
    createdAt: { type: Date, default: Date.now }
  }
});

// Optimisation des performances avec des index
GcbsResultSchema.index({ 'technical.createdAt': -1 });

const GcbsResult = mongoose.model('GcbsResult', GcbsResultSchema);

module.exports = GcbsResult; 