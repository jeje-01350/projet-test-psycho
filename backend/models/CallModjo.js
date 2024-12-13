const mongoose = require("mongoose");

const CallModjoSchema = new mongoose.Schema(
  {
      hs_object_id: {
          type: Number,
          required: true,
        },
      call_note: {
          type: String,
          required: true,
      }
  },
  { timestamps: true }
);


const CallModjo = mongoose.model("CallModjo", CallModjoSchema);
module.exports = CallModjo;
