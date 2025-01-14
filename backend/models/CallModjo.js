const mongoose = require("mongoose");

const CallModjoSchema = new mongoose.Schema(
  {
      hs_object_id: {
          type: Number,
          required: true,
        },
      call_note: {
          type: String,
          required: false,
      },
      call_note_visio: {
          type: String,
          required: false,
      },
      bilanColorV2: {
          type: String,
          required: false,
      },
      bilanLetterV2: {
          type: String,
          required: false,
      }
  },
  { timestamps: true }
);


const CallModjo = mongoose.model("CallModjo", CallModjoSchema);
module.exports = CallModjo;
