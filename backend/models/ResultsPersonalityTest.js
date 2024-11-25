const mongoose = require("mongoose");

const ResultsPersonalityTestSchema = new mongoose.Schema(
  {
      scores: {
          type: Object,
          required: true,
      },
        summary: {
          type: String,
          required: true,
        },
      userAnswers: {
          type: Object,
          required: true,
      }
  },
  { timestamps: true }
);


const ResultsPersonalityTest = mongoose.model("ResultsPersonality", ResultsPersonalityTestSchema);
module.exports = ResultsPersonalityTest;
