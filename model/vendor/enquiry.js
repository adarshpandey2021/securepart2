const mongoose = require('mongoose');
const counter = require('../../utils/counter');

const enquirySchema = new mongoose.Schema(
  {
    requirementNo: {
      type: String,
      ref: 'requirementGeneration',
      required: true
    },
    date: {
      type: Date
    },
    category: {
      type: String,
      enum: {
        values: [
          'House Keeping',
          'Stationary',
          'Repair And Maintenance',
          'Construction',
          'Pharmaceutical',
          'Transport'
        ],
        message:
          'The category should be House Keeping, Stationary, Repair And Maintenance, Construction, Pharmaceutical, Transport'
      }
    },
    purchaseRepresentative: {
      type: String
    },
    enquiryNo: {
      type: String
    },
    _id: {
      type: String
    },
    enquireDate: {
      type: Date
    },
    vendorName: {
      type: String
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

enquirySchema.pre('save', counter('enquiry', 6));

const EnquiryModel = mongoose.model('requirementEnquiry', enquirySchema);
module.exports = EnquiryModel;
