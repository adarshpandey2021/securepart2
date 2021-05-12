const mongoose = require("mongoose");

const PolicySchema = new mongoose.Schema({
  requirement1: {
    type: String,
  },
  requirement2: {
    type: String,
  },
  requirement3: {
    type: String,
  },
  requirement4: {
    type: String,
  },
  requirement5: {
    type: String,
  },
  requirement6: {
    type: String,
  },
  requirement7: {
    type: String,
  },
  requirement8: {
    type: String,
  },
});

module.exports = mongoose.model("PolicySchema", PolicySchema);
