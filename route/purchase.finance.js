const express = require("express");
const router = express.Router();

const {
  VendorSetup,
  GetVendorSetup,
  RequestQuotation,
  GetRequestQuotation,
  LockedOrder,
  PurchaseOrder,
  GetPurchaseOrder,
  ReceivePayment,
  VendorBill,
  GetVendorBill,
  ReceiveVendorBill,
} = require("../controller/purchase.finance");

//VendorSetUp

router.post("/vendersetup", VendorSetup);
router.get("/getvendersetup", GetVendorSetup);

///request quotation

router.post("/requestquotation", RequestQuotation);
router.get("/getrequestquotation", GetRequestQuotation);
router.patch("/lockedorder/:id", LockedOrder);

//purchhase order
router.post("/purchaseorder", PurchaseOrder);
router.get("/getpurchaseorder", GetPurchaseOrder);
router.patch("/receivepurchase/:id", ReceivePayment);

//Vendor Bill
router.post("/vendorbill", VendorBill);
router.get("/getvendorbill", GetVendorBill);
router.patch("/receivevendorbill/:id", ReceiveVendorBill);

module.exports = router;
