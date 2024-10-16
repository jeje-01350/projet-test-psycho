const mongoose = require("mongoose");

const ResultsBigfiveSchema = new mongoose.Schema({
    scores: {
        type: Map,
        of: Number,
        required: true,
    },
    userAnswers: {
        type: Object,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const ResultsBigfive = mongoose.model("ResultsBigfive", ResultsBigfiveSchema);
module.exports = ResultsBigfive;
