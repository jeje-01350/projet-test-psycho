const mongoose = require("mongoose");

const ResultsCareerPredictionSchema = new mongoose.Schema(
  {
    userResponse: [
      {
        no: {
          type: Number,
          required: true,
        },

        value: {
          type: Number,
          required: true,
        },
      },
    ],
    personalityScore: [
      {
        percentage: {
          type: Number,
          required: true,
        },

        trait: {
          type: String,
          required: true,
        },
      },
    ],
      summary: {
          type: String,
          required: true
      },
      mbtiType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// const AnswerSchema = new mongoose.Schema(
//   {
//     no: {
//       type: Number,
//       required: true,
//     },

//     value: {
//       type: Number,
//       required: true,
//     },
//   },

//   { timestamps: true }
// );

const ResultsCareerPrediction = mongoose.model("ResultsCareerPrediction", ResultsCareerPredictionSchema);
module.exports = ResultsCareerPrediction;
