const mongoose = require("mongoose");

const ResultsRiasecSchema = new mongoose.Schema({
    resultatPrincipal: {
        type: String,
        required: true,
    },
    resultatSecondaire: {
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

const ResultsRiasec = mongoose.model("ResultsRiasec", ResultsRiasecSchema);
module.exports = ResultsRiasec;
