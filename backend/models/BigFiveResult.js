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

// Supprimer tous les index existants pour ce modèle
BigFiveResultSchema.indexes().forEach(index => {
  BigFiveResultSchema.index(index.fields, { background: true });
});

const BigFiveResult = mongoose.model('BigFiveResult', BigFiveResultSchema);

// Supprimer l'index spécifique hs_object_id s'il existe
BigFiveResult.collection.dropIndex('hs_object_id_1')
  .catch(err => {
    // Ignorer l'erreur si l'index n'existe pas
    if (err.code !== 27) {
      console.error('Erreur lors de la suppression de l\'index:', err);
    }
  });

module.exports = BigFiveResult; 