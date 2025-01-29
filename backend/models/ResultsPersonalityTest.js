const mongoose = require("mongoose");

const ResultsPersonalityTestSchema = new mongoose.Schema(
  {
      hs_object_id: {
          type: Number,
          required: true,
      },color: {
          type: String,
          required: true,
      },letter: {
          type: String,
          required: true,
      },email: {
          type: String,
          required: true,
      },
  },
);


const ResultsPersonalityTest = mongoose.model("ResultsPersonality", ResultsPersonalityTestSchema);
module.exports = ResultsPersonalityTest;
