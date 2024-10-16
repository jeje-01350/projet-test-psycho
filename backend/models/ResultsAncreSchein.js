const mongoose = require("mongoose");

const ResultsAncreScheinSchema = new mongoose.Schema({
    scores: {
        type: Map,
        of: Number,
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

const ResultsAncreSchein = mongoose.model("ResultsAncreSchein", ResultsAncreScheinSchema);
module.exports = ResultsAncreSchein;
