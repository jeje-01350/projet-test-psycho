const mongoose = require('mongoose');

const riasecResultSchema = new mongoose.Schema({
  result: {
    scores: {
      R: Number,
      I: Number,
      A: Number,
      S: Number,
      E: Number,
      C: Number
    },
    userAnswers: {
      type: Map,
      of: Number,
      required: true
    }
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
    }
  }
}, {
  timestamps: true
});

// Méthode pour calculer les scores RIASEC
riasecResultSchema.methods.calculateScores = function() {
  const categories = ['R', 'I', 'A', 'S', 'E', 'C'];
  const scores = {};

  categories.forEach(category => {
    let sum = 0;
    for (let i = 1; i <= 8; i++) {
      const response = this.result.userAnswers.get(`${category}${i}`);
      if (response) sum += response;
    }
    scores[category] = sum;
  });

  return scores;
};

const RiasecResult = mongoose.model('RiasecResult', riasecResultSchema);

module.exports = RiasecResult; 