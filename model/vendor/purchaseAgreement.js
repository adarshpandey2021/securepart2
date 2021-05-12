const mongoose = require('mongoose');
const counter = require('../../utils/counter');

const purchaseSchema = new mongoose.Schema(
  {
    _id: {
      type: String
    },
    purchaseNo: {
      type: String
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
          'The Vendor Category should be House Keeping, Stationary, Repair And Maintenance, Construction, Pharmaceutical, Transport'
      }
    },
    agreementType: {
      type: String
    },
    vendorRepresentation: {
      type: String
    },
    vendorNo: {
      type: String,
      ref: 'vendorInfo'
    },
    siningAuthority: {
      type: {
        String
      }
    },
    employeeNo: {
      type: String,
      ref: 'CreateEmployee'
    },
    deliveryTime: {
      type: Date
    },
    product: {
      type: String
    },
    showPurchaseOrder: {
      type: String
    },
    quantity: {
      type: Number
    },
    unitPrice: {
      type: Number
    },
    performerInvoiceUpload: {
      type: String
    },
    status: {
      type: String,
      enum: {
        values: ['Signed', 'Pending'],
        message: 'The status should be Signed or Pending'
      },
      deleted: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

purchaseSchema.pre('save', counter('purchase', 7, 'PO'));

purchaseSchema.pre(/^find/, function(next) {
  this.find({ deleted: false });
  next();
});

const PurchaseAgreement = mongoose.model('PurchaseAgreement', purchaseSchema);

module.exports = PurchaseAgreement;
