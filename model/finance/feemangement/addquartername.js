const mongoose = require("mongoose");

const QuarterNameSchema = new mongoose.Schema({
  numberOfQuarter: {
    type: Number,
  },
  quarters: [
    {
      quarterName: {
        type: String,
      },
      quarterMonth: [
        {
          type: String,
        },
      ],
      dueDate: {
        type: String,
      },
      qFeePercentOne: {
        type: Number,
      },
      startingMonth: {
        type: Number,
      },
      endingMonth: {
        type: Number,
      },
      quaterMonthName: {
        type: String,
      },
      quarterNumber: {
        type: Number,
      },
    },
  ],
});
module.exports = mongoose.model("QuarterNameSchema", QuarterNameSchema);
