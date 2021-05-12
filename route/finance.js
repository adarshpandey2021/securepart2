const express = require("express");
const router = express.Router();
const {
  AddFeeAdmission,
  GetAddFeeAdmission,
  AddFeeSchool,
  AddFeeTransport,
  GetAddFeeSchool,
  GetAddFeeTransport,
  AdditionFee,
  GetAdditionFee,
  ConfigureFee,
  GetConfigureFee,
  EditConfigureFee,
  CollectionFee,
  GetCollectionFee,
  FeePayment,
  GetFeePayment,
  RefundFee,
  GetRefundFee,
  FeeChalanGenerate,
  GetFeeChallan,
  AddFeeConcession,
  GetApplicationNumberFeeConcession,
  AddQuarterName,
  GetAddedQuarter,
  DeleteQuarterAdded,
  DeleteAddFeeAdmissio,
  UpdateAddFeeAdmission,
  DeleteAddFeeSchool,
  UpdateAddFeeSchool,
  DeleteAddFeeTransport,
  UpdateAddFeeTransport,
  AddmissionFeeStructure,
  GetAddmissionFeeStructure,
  DeleteAddmissionFeeStructure,
  UpdateAddmissionFeeStructure,
  SchoolFeeStructure,
  GetSchoolFeeStructure,
  DeleteSchoolFeeStructure,
  UpdateSchoolFeeStructure,
  TranportFeeStructure,
  GetTranportFeeStructure,
  DeleteTranportFeeStructure,
  UpdateTranportFeeStructure,
  GetScheduleCollectionFee,
  GetConcessionByType,
  GetTotalPaymentDetails,
  GetScheduleCollectionFeeById,
  FeeReceipt,
  GetFeeReceipt,
  GetQuarterPayment,
  GetAmountByapplicationNoandQuarter,
  UpdateFeeChallan,
  UpdateScheduleCollection,
  GetSchoolFeeStructureByLoc,
  GetTransportFeeStructureByLoc,
  GetAdmissionFeeStructureByLoc,
  GetAllAddFeeAdmission,
  GetAllAddFeeSchool,
  GetAllAddFeeTransport,
  GetadmissionfeeByfields,
  GetQuaterMonthByName,
  QuaterDueDate,
  GetDetailsOfQuartPayment,
  ShowAdmissionNumberOfUnPaid,
} = require("../controller/finanace");

//Add fees
router.post("/addfeeadmission", AddFeeAdmission);
router.get("/getaddfeeadmission", GetAddFeeAdmission);
router.delete("/deleteadmission/:id", DeleteAddFeeAdmissio);
router.patch("/updadeadmissionfee/:id", UpdateAddFeeAdmission);

router.post("/addfeetransport", AddFeeTransport);
router.get("/getaddfeetransport", GetAddFeeTransport);
router.delete("/deletetransport/:id", DeleteAddFeeTransport);
router.patch("/updadetransport/:id", UpdateAddFeeTransport);

router.post("/addfeeschool", AddFeeSchool);
router.get("/getaddfeeschool", GetAddFeeSchool);
router.delete("/deleteschool/:id", DeleteAddFeeSchool);
router.patch("/updadeschool/:id", UpdateAddFeeSchool);
/// get all add fee
router.get("/getalladdfeeadmission", GetAllAddFeeAdmission);
router.get("/getalladdfeeschool", GetAllAddFeeSchool);
router.get("/getalladdfeetransport", GetAllAddFeeTransport);

router.post("/additionfee", AdditionFee);
router.get("/getadditionfee", GetAdditionFee);
router.post("/configurefee", ConfigureFee);
router.get("/getconfig", GetConfigureFee);
router.patch("/editconfigfee/:id", EditConfigureFee);

//collection fees
router.post("/collectionfee", CollectionFee);
router.get("/getcollectonfee", GetCollectionFee);

// feePayment
router.post("/feepayment", FeePayment);
router.get("/getfeepayment", GetFeePayment);

//refund Fee
router.post("/refundfee", RefundFee);
router.get("/getrefundfee", GetRefundFee);

FeeChalanGenerate, GetFeeChallan;
//Generate Fee Challan

router.post("/generatechallan", FeeChalanGenerate);
router.get("/getgeneratechallan", GetFeeChallan);
router.patch("/updatefeechallan/:id", UpdateFeeChallan);

//
router.patch("/addfeeconcession", AddFeeConcession);
router.get("/getaddfeeconcession", GetApplicationNumberFeeConcession);

///quarter Addition

router.post("/addquarter", AddQuarterName);
router.get("/getaddquarter", GetAddedQuarter);
router.delete("/deletequarter/:id", DeleteQuarterAdded);
router.get("/getquatermonthname", GetQuaterMonthByName);

///fee structure of Admission fee
router.post("/fsadmission", AddmissionFeeStructure);
router.get("/getfsadmission", GetAddmissionFeeStructure);
router.delete("/deletefsadmission/:id", DeleteAddmissionFeeStructure);
router.patch("/updatefsadmissio/:id", UpdateAddmissionFeeStructure);
router.get("/getalladmissionfs", GetAdmissionFeeStructureByLoc);

///fee structure of School fee
router.post("/fsschool", SchoolFeeStructure);
router.get("/getfsschool", GetSchoolFeeStructure);
router.delete("/deletefsschool/:id", DeleteSchoolFeeStructure);
router.patch("/updatefsschool/:id", UpdateSchoolFeeStructure);
router.get("/getallschoolfs", GetSchoolFeeStructureByLoc);

//fee structure for tranport fee
router.post("/fstransport", TranportFeeStructure);
router.get("/getfstransport", GetTranportFeeStructure);
router.delete("/deletefstransport/:id", DeleteTranportFeeStructure);
router.patch("/updatefstransport/:id", UpdateTranportFeeStructure);
router.get("/getalltransportfs", GetTransportFeeStructureByLoc);
///
router.get("/getschedulecollection", GetScheduleCollectionFee);
router.get("/getschedulebyid/:id", GetScheduleCollectionFeeById);
router.patch("/updateschedulebyid/:id", UpdateScheduleCollection);
router.get("/gettotalpayement", GetTotalPaymentDetails);
router.get("/getconcessiontype", GetConcessionByType);

/// fee receipt

router.post("/feereceipt", FeeReceipt);
router.get("/getfeereceipt", GetFeeReceipt);

router.get("/quarterpayment", GetQuarterPayment);
router.get("/getamountbyquarter", GetAmountByapplicationNoandQuarter);

router.get("/quarterdate", QuaterDueDate);

router.get("/quarterpaymentbyid", GetDetailsOfQuartPayment);

router.get("/getadmissionnounpaid", ShowAdmissionNumberOfUnPaid);

module.exports = router;
