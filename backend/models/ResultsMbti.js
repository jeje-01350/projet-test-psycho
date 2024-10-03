const mongoose = require("mongoose");

const ResultsMbtiSchema = new mongoose.Schema({
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

const ResultsMbti = mongoose.model("ResultsMbti", ResultsMbtiSchema);
module.exports = ResultsMbti;
