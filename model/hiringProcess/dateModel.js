const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
    name: String,
    startDate: Date,
    lastDate: Date
})

const DateModel = mongoose.model("DateModel", dateSchema);

module.exports = DateModel;