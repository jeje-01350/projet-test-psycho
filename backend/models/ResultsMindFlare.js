const mongoose = require("mongoose");

const MindFlareResultSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_age: {
        type: Number,
        required: true
    },
    scores: {
        type: Map,
        of: Number,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userAnswers: {
        type: Object,
        required: true,
    }
});

const MindFlareResult = mongoose.model("MindFlareResult", MindFlareResultSchema);
module.exports = MindFlareResult;
