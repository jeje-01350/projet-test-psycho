const mongoose = require("mongoose");

const CallModjoSchema = new mongoose.Schema(
  {
      score: {
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


const CallModjo = mongoose.model("CallModjo", CallModjoSchema);
module.exports = CallModjo;
