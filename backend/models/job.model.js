const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    imageUrls: {
        type: Array,
    },
    jobTitle: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    responsesTxt: {
        type: String,
    },
    favLevel: {
        type: Number,
        required: true,
    }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;