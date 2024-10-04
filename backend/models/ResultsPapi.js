const mongoose = require("mongoose");

const ResultsPapiSchema = new mongoose.Schema({
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

const ResultsPapi = mongoose.model("ResultsPapi", ResultsPapiSchema);
module.exports = ResultsPapi;
