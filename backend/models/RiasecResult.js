const mongoose = require('mongoose');

const riasecResultSchema = new mongoose.Schema({
  responses: {
    riasec: {
      type: Map,
      of: Number,
      required: true
    },
    tipi: {
      type: Map,
      of: Number,
      required: true
    },
    vocabulary: {
      type: Map,
      of: Boolean,
      required: true
    },
    demographics: {
      education: Number,
      environment: Number,
      gender: Number,
      nativeLanguage: Number,
      age: Number,
      handedness: Number,
      religion: Number,
      sexualOrientation: Number,
      ethnicity: Number,
      votingParticipation: Number,
      maritalStatus: Number,
      siblingCount: Number,
      universityMajor: String
    }
  },
  scores: {
    riasec: {
      R: Number,
      I: Number,
      A: Number,
      S: Number,
      E: Number,
      C: Number
    },
    tipi: {
      extraversion: Number,
      agreeableness: Number,
      conscientiousness: Number,
      emotionalStability: Number,
      openness: Number
    },
    vocabulary: {
      correct: Number,
      total: Number,
      invalidWords: Number
    }
  },
  interpretation: {
    dominantTypes: [String],
    personalityTraits: [String],
    recommendations: [String]
  },
  metadata: {
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    introElapse: Number,
    testElapse: Number,
    surveyElapse: Number,
    uniqueNetworkLocation: Number,
    country: String,
    source: Number
  }
}, {
  timestamps: true
});

// Méthode pour calculer les scores RIASEC
riasecResultSchema.methods.calculateRiasecScores = function() {
  const categories = ['R', 'I', 'A', 'S', 'E', 'C'];
  const scores = {};

  categories.forEach(category => {
    let sum = 0;
    for (let i = 1; i <= 8; i++) {
      const response = this.responses.riasec[`${category}${i}`];
      if (response) sum += response;
    }
    scores[category] = sum;
  });

  return scores;
};

// Méthode pour calculer les scores TIPI
riasecResultSchema.methods.calculateTipiScores = function() {
  const dimensions = {
    extraversion: { pos: 'TIPI1', neg: 'TIPI6' },
    agreeableness: { pos: 'TIPI7', neg: 'TIPI2' },
    conscientiousness: { pos: 'TIPI3', neg: 'TIPI8' },
    emotionalStability: { pos: 'TIPI9', neg: 'TIPI4' },
    openness: { pos: 'TIPI5', neg: 'TIPI10' }
  };

  const scores = {};
  for (const [dimension, items] of Object.entries(dimensions)) {
    const posScore = this.responses.tipi[items.pos] || 0;
    const negScore = this.responses.tipi[items.neg] || 0;
    scores[dimension] = (posScore + (8 - negScore)) / 2;
  }

  return scores;
};

// Méthode pour calculer le score de vocabulaire
riasecResultSchema.methods.calculateVocabularyScore = function() {
  const invalidWords = ['VCL6', 'VCL9', 'VCL12'];
  let correct = 0;
  let invalidCount = 0;

  for (const [word, checked] of Object.entries(this.responses.vocabulary)) {
    if (checked) {
      if (invalidWords.includes(word)) {
        invalidCount++;
      } else {
        correct++;
      }
    }
  }

  return {
    correct,
    total: 13, // Nombre total de mots valides
    invalidWords: invalidCount
  };
};

// Méthode pour interpréter les résultats
riasecResultSchema.methods.interpretResults = function() {
  const riasecScores = this.calculateRiasecScores();
  const tipiScores = this.calculateTipiScores();
  
  // Trouver les types dominants (les 3 scores les plus élevés)
  const sortedTypes = Object.entries(riasecScores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([type]) => type);

  // Générer des recommandations basées sur les types dominants
  const recommendations = this.generateRecommendations(sortedTypes);

  // Identifier les traits de personnalité marquants
  const personalityTraits = this.identifySignificantTraits(tipiScores);

  return {
    dominantTypes: sortedTypes,
    recommendations,
    personalityTraits
  };
};

// Méthode pour générer des recommandations
riasecResultSchema.methods.generateRecommendations = function(dominantTypes) {
  const recommendations = [];
  // Logique de recommandation basée sur les types dominants
  // À personnaliser selon les besoins
  return recommendations;
};

// Méthode pour identifier les traits de personnalité significatifs
riasecResultSchema.methods.identifySignificantTraits = function(tipiScores) {
  const traits = [];
  // Logique d'identification des traits significatifs
  // À personnaliser selon les besoins
  return traits;
};

const RiasecResult = mongoose.model('RiasecResult', riasecResultSchema);

module.exports = RiasecResult; 