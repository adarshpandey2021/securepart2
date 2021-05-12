const VendorSetupSchema = require("../model/finance/purchasemanagement/vendorsetup");
const RequestQuotationSchema = require("../model/finance/purchasemanagement/quotation");
const PurchaseOrderSchema = require("../model/finance/purchasemanagement/purchaseorder");
const VendorBillSchema = require("../model/finance/purchasemanagement/vendorbill");

exports.VendorSetup = (req, res, next) => {
  const {
    vendor,
    ownerName,
    bankname,
    bankNumber,
    email,
    mobile,
    gstNo,
    street1,
    street2,
    city,
    state,
    pincode,
  } = req.body;

  let newdata = new VendorSetupSchema({
    vendor,
    ownerName,
    bankname,
    bankNumber,
    email,
    mobile,
    gstNo,
    street1,
    street2,
    city,
    state,
    pincode,
    fulladdress: `${
      street1 + " " + street2 + " " + city + " " + state + " " + pincode
    }`,
  });

  newdata.save((data, err) => {
    if (err) return console.log(err);

    return res.json({
      msg: "Vendor Setup is  added",
    });
  });
};

exports.GetVendorSetup = (req, res, next) => {
  VendorSetupSchema.find({}, (err, list) => {
    if (err) console.log(err);
    else res.send({ VendorList: list });
  });
};

exports.RequestQuotation = (req, res, next) => {
  const {
    vendor,
    vendorRef,
    orderDate,
    product,
    scheduleDate,
    quantity,
    unitPrice,
    taxes,
    subtotal,
    description,
    reference,
    quotataionorderDate,
    quotataionvendor,
    quotataionscheduleDate,
    purchaseRepresentative,
    sourceDocument,
    untaxed,
    total,
    agreementvendor,
    agreementType,
    agreementpurchaseRepresentative,
    deliveryTime,
    agreementproduct,
    agreementquantity,
    agreementunitPrice,
    billUploads,
  } = req.body;

  let newdata = new RequestQuotationSchema({
    vendor,
    vendorRef,
    orderDate,
    product,
    scheduleDate,
    quantity,
    unitPrice,
    taxes,
    subtotal,
    description,
    quotation: [
      {
        reference,
        quotataionorderDate,
        quotataionvendor,
        quotataionscheduleDate,
        purchaseRepresentative,
        sourceDocument,
        untaxed,
        total,
      },
    ],
    purchaseAgreement: [
      {
        agreementvendor,
        agreementType,
        agreementpurchaseRepresentative,
        deliveryTime,
        agreementproduct,
        agreementquantity,
        agreementunitPrice,
        billUploads,
      },
    ],
  });

  newdata.save((data, err) => {
    if (err) return console.log(err);

    return res.json({
      msg: "Request Quotation is added",
    });
  });
};

exports.GetRequestQuotation = (req, res, next) => {
  RequestQuotationSchema.find({}, (err, list) => {
    if (err) console.log(err);
    else res.send({ RequestQuation: list });
  });
};

exports.LockedOrder = (req, res, next) => {
  const id = req.params.id;
  RequestQuotationSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.quotation[0].status = "Locked";
      data.save((data, err) => {
        if (err) return console.log(err);
        return res.send("quotation  is locked");
      });
    }
  });
};

exports.PurchaseOrder = (req, res, next) => {
  const {
    quotationId,
    vendor,
    vendorRef,
    purchaseAgreement,
    orderDate,
    product,
    scheduleDate,
    quantity,
    unitPrice,
    taxes,
    subtotal,
    billUploads,
    description,
  } = req.body;
  let newdata = new PurchaseOrderSchema({
    quotationId,
    vendor,
    vendorRef,
    purchaseAgreement,
    orderDate,
    product,
    scheduleDate,
    quantity,
    unitPrice,
    taxes,
    subtotal,
    billUploads,
    description,
  });
  newdata.save((data, err) => {
    if (err) return console.log(err);

    return res.json({
      msg: "Purchase order is added",
    });
  });
};

exports.GetPurchaseOrder = (req, res, next) => {
  PurchaseOrderSchema.find({}, (err, list) => {
    if (err) console.log(err);
    else res.send({ PurchasOrder: list });
  });
};

exports.ReceivePayment = (req, res, next) => {
  const id = req.params.id;
  PurchaseOrderSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.status = "Receive";
      data.save((data, err) => {
        if (err) return console.log(err);
        return res.send("Receive Payment");
      });
    }
  });
};

exports.VendorBill = (req, res, next) => {
  const {
    orderNo,
    vendor,
    product,
    paymentmode,
    paymentType,
    billDate,
    billUploads,
    quantity,
    unitPrice,
    discount,
    taxes,
    currentAmount,
    totalAmount,
  } = req.body;

  let newdata = new VendorBillSchema({
    orderNo,
    vendor,
    product,
    paymentmode,
    paymentType,
    billDate,
    billUploads,
    quantity,
    unitPrice,
    discount,
    taxes,
    currentAmount,
    totalAmount,
  });

  newdata.save((data, err) => {
    if (err) return console.log(err);

    return res.json({
      msg: "Vendor Bill is added",
    });
  });
};

exports.GetVendorBill = (req, res, next) => {
  VendorBillSchema.find({}, (err, list) => {
    if (err) console.log(err);
    else res.send({ VendorList: list });
  });
};

exports.ReceiveVendorBill = (req, res, next) => {
  const id = req.params.id;
  VendorBillSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.status = "Receive";
      data.save((data, err) => {
        if (err) return console.log(err);
        return res.send("Receive Vendor Bill");
      });
    }
  });
};
