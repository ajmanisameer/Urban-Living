
const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
    flatNo: {
        type: Number,
    },
    status: {
        type: Boolean,
    },

}, { timestamps: true });

module.exports = mongoose.model("Apartment", apartmentSchema);