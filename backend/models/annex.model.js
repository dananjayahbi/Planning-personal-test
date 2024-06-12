const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const annexSchema = new Schema({
    imageUrls: {
        type: Array,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    mobileNo: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    annexToCampusDistance: {
        type: Number,
    },
    annexToColomboDistance: {
        type: Number,
    },
    annexToBattaramullaDistance: {
        type: Number,
    },
    favLevel: {
        type: Number,
    }
});

const Annex = mongoose.model("Annex", annexSchema);

module.exports = Annex;