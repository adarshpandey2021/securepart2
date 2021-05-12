const express = require("express");
const router = express.Router();

const {
  SalaryStructure,
  GetSalaryStructure,
  AssignSalaryStructure,
  GetAssignSalaryStructure,
  Leave,
  GetLeave,
  RejectLeave,
  ApproveLeave,
  DeleteLeave,
  SalaryPayment,
  GetSalaryPayment,
} = require("../controller/payroll.finance");

///Salalrystructure

router.post("/salarystructure", SalaryStructure);
router.get("/getsalarystructure", GetSalaryStructure);

///assign struncture

router.post("/assignsalarystructure", AssignSalaryStructure);
router.get("/getassignsalarystructure", GetAssignSalaryStructure);

//Leave System

router.post("/leave", Leave);
router.get("/getleave", GetLeave);
router.patch("/rejectleave/:id", RejectLeave);
router.patch("/approveleave/:id", ApproveLeave);
router.delete("/deleteleave/:id", DeleteLeave);

///salary payment

router.post("/salarypayment", SalaryPayment);
router.get("/getsalarypayment", GetSalaryPayment);

module.exports = router;
