const mongoose = require("mongoose");

const ResultsKapableSchema = new mongoose.Schema({
    scores: {
        type: String,
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
    userAnswers: {
        type: Object,
        required: true,
    }
});

const ResultsKapable = mongoose.model("ResultsKapable", ResultsKapableSchema);
module.exports = ResultsKapable;
