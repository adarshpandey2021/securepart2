const express = require("express");
const router = express.Router();
const {
  ApplicantDetails,
  showApplicantDetails,
  ChangeApplicantStatus,
  GetDeatilsOfExam,
  FinalSubmit,
  SendNotificationOfScreening,
  SeatAllotment,
  GetlistOfSeatAllotment,
  AdmissionNotification,
  GetNotify,
  Policy,
  GetPolicy,
  Screening,
  ShortList,
  DocumentVerification,
  AdmissionFee,
  GetClassYear,
  ConfirmtionMail,
  GetFitForScreening,
  Getshortlisted,
  GetConfirmation,
  GetDocVerify,
  GetDepositedFee,
  GenerateAdmissionNo,
  GetClassYearConfirmation,
  GetClassYearFitForScreening,
  GetClassYearShortList,
  GetAlladmissionNo,
  GetActiveClass,
  UploadMarksheet,
  AddPolicy,
  GetPolicyAdded,
  EditPolicy,
  GetDataById,
  GetDataByYear,
  Print,
  AdmissionReport,
  DocumentVerificationdobCerti,
  DocumentVerificationsssimdCerti,
  DocumentVerificationmedicalCerti,
  DocumentVerificationadharcardCerti,
  DocumentVerificationtransferCerti,
  getStatedata,
  getCitiesName,
  getCountrydata,
  GetDataByClassFeedeposited,
  AddFAQ,
  GetFAQanswers,
  EditFaqAnswer,
  PrintAdmissionForm,
  DeleteApplicantDetails,
  GetDetailsOfApplicantById,
  GetActiveClassByLocation,
  DeleteNotification,
  PrintFeeRecipt,
} = require("../controller/admission");

const { paymentCheck } = require("../middleware/payment");

const multer = require("multer");

const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({ storage }).single("image");

//post deatils of admission // get admission details notification
router.post("/admissionnotify", AdmissionNotification);
router.get("/getnotification", GetNotify);
router.delete("/deletenotificationdetails/:id", DeleteNotification);

//post details for applying //final submit link
// get list of all application // select student by verifying eligibility
router.post("/applicantdetails", ApplicantDetails);
router.post("/savefiles", upload, UploadMarksheet);
router.patch("/finalsubmit/:id", paymentCheck, FinalSubmit);
router.patch("/statusapplicant/:id", ChangeApplicantStatus);

router.get("/getapplicantdetails", showApplicantDetails);
router.get("/getapplicantbyid/:id", GetDetailsOfApplicantById);
router.delete("/deleteapplicantdetails/:id", DeleteApplicantDetails);

//Policy
router.post("/policy", Policy);
router.get("/getpolicy", GetPolicy);

router.put("/screening", Screening);
//save test details and send mail // get details of offline exams
router.post("/testdetails", SendNotificationOfScreening);
router.get("/getexamdetails", GetDeatilsOfExam);

//shortlist
router.patch("/shortlist/:id", ShortList);

//doc verification

router.patch("/docverify/:id", DocumentVerification);
router.get("/getdata", GetClassYear);

///ConfirmtionMail
router.post("/confirmationmail", ConfirmtionMail);

//addmission fee
router.patch("/addfee/:id", AdmissionFee);

//seat allotment
router.patch("/seatalot", SeatAllotment);
router.get("/getseatalot", GetlistOfSeatAllotment);

///get api for selected students
router.get("/getfitforscreening", GetFitForScreening);
router.get("/getshortlisted", Getshortlisted);
router.get("/getconfirmation", GetConfirmation);
router.get("/getdocverify", GetDocVerify);
router.get("/getfeedeposited", GetDepositedFee);

router.patch("/generateno/:id", GenerateAdmissionNo);
router.get("/alladmissionno", GetAlladmissionNo);

////get as as per status and requirment ,,

router.get("/getyearstatus", GetClassYearFitForScreening);
router.get("/getyearshortlist", GetClassYearShortList);
router.get("/getyearconfirm", GetClassYearConfirmation);

//GetDataByClassFeedeposited
router.get("/getdataclassfee", GetDataByClassFeedeposited);

router.get("/getactiveclass", GetActiveClass);

router.get("/getclassbyloc", GetActiveClassByLocation);

////////Policy addded
router.post("/addpolicy", AddPolicy);
router.get("/getaddpolicy", GetPolicyAdded);
router.patch("/editpolicy/:id", EditPolicy);

////Get Databy id and year

router.get("/getbyyear", GetDataByYear);
router.get("/getbyid", GetDataById);
router.get("/print/:id", Print);

router.post("/admissionreport", AdmissionReport);

/// doc status

router.patch("/dobcerti/:id", DocumentVerificationdobCerti);
router.patch("/sssimdcerti/:id", DocumentVerificationsssimdCerti);
router.patch("/medicalcerti/:id", DocumentVerificationmedicalCerti);
router.patch("/adharcardcerti/:id", DocumentVerificationadharcardCerti);
router.patch("/transfercerti/:id", DocumentVerificationtransferCerti);

router.get("/states", getStatedata);
router.get("/countries", getCountrydata);
router.get("/city", getCitiesName);

///Add FAQ

router.post("/faqans", AddFAQ);
router.get("/getfaqans", GetFAQanswers);

router.patch("/updatefaq/:id", EditFaqAnswer);

router.get("/printregistration/:id", PrintAdmissionForm);

router.get("/printfeereceipt/:id", PrintFeeRecipt);

module.exports = router;
