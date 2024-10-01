const mongoose = require("mongoose");

const ResultsDjangoPersonalityTestSchema = new mongoose.Schema({
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
});

const ResultsDjangoPersonalityTest = mongoose.model("ResultsDjangoPersonalityTest", ResultsDjangoPersonalityTestSchema);
module.exports = ResultsDjangoPersonalityTest;
