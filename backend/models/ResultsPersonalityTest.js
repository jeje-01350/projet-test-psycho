const mongoose = require("mongoose");

const ResultsPersonalityTestSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    letters: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    briggs: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const ResultsPersonalityTest = mongoose.model("ResultsPersonality", ResultsPersonalityTestSchema);
module.exports = ResultsPersonalityTest;
