const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  quotationNo: {
    type: String
  }
});
