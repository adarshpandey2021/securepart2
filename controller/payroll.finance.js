const SalaryStructureSchema = require("../model/finance/payroll/salaryStructure");
const AssignSalaryStructureSchema = require("../model/finance/payroll/assignSalaryStructure");
const LeaveSchema = require("../model/finance/payroll/leave");
const SalaryPaymentSchema = require("../model/finance/payroll/salaryPayment");

exports.SalaryStructure = (req, res, next) => {
  const {
    desiginationRole,
    salaryHead,
    typeOfSalary,
    salaryAmount,
    minFixedAmount,
    percentageOfOtherHead,
  } = req.body;
  let newdata = new SalaryStructureSchema({
    desiginationRole,
    salaryHead,
    typeOfSalary,
    salaryAmount,
    minFixedAmount,
    percentageOfOtherHead,
  });

  newdata.save((d, err) => {
    if (err) return console.log(err);
    return res.json({
      msg: " Salary structure  added",
    });
  });
};

exports.GetSalaryStructure = (req, res, next) => {
  SalaryStructureSchema.find({}, (err, list) => {
    if (err) return console.log(err);
    return res.send({
      SalaryStructure: list,
    });
  });
};

///assign salary structure
exports.AssignSalaryStructure = (req, res, next) => {
  const {
    staff,
    monthEffectiveFrom,
    remark,
    basic,
    transport,
    pf,
    performanceAward,
  } = req.body;

  let newdata = new AssignSalaryStructureSchema({
    staff,
    monthEffectiveFrom,
    remark,
    salaryTemplate: {
      basic,
      transport,
      pf,
      performanceAward,
      total: basic + transport + pf + performanceAward,
    },
  });
  newdata.save((d, err) => {
    if (err) return console.log(err);
    return res.json({
      msg: " Assign Salary structure  Done",
    });
  });
};

exports.GetAssignSalaryStructure = (req, res, next) => {
  AssignSalaryStructureSchema.find({}, (err, list) => {
    if (err) return console.log(err);
    return res.send({
      AssignSalaryStructure: list,
    });
  });
};

/////////Leave system

exports.Leave = (req, res, next) => {
  const { staffName, leaveType, fromDate, toDate, numberOfDay } = req.body;

  let newdata = new LeaveSchema({
    staffName,
    leaveType,
    fromDate,
    toDate,
    numberOfDay,
  });
  newdata.save((d, err) => {
    if (err) return console.log(err);
    return res.json({
      msg: " Leave Added ",
    });
  });
};

exports.GetLeave = (req, res, next) => {
  LeaveSchema.find({}, (err, list) => {
    if (err) return console.log(err);
    return res.send({
      leaveData: list,
    });
  });
};
exports.RejectLeave = (req, res, next) => {
  const id = req.params.id;
  LeaveSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.status = "reject";
      data.save((data, err) => {
        if (err) return console.log(err);
        return res.send("Leave is rejected");
      });
    }
  });
};
exports.ApproveLeave = (req, res, next) => {
  const id = req.params.id;
  LeaveSchema.findById(id, (err, data) => {
    if (err) console.log(err);
    else {
      data.status = "approve";
      data.save((data, err) => {
        if (err) return console.log(err);
        return res.send("Leave is approve");
      });
    }
  });
};

exports.DeleteLeave = (req, res, next) => {
  const id = req.params.id;
  LeaveSchema.findByIdAndRemove({ _id: id }, (err, data) => {
    if (err) console.log(err);
    else {
      res.json({ status: "Success", msg: "Leave Deleted" });
    }
  });
};

exports.SalaryPayment = (req, res, next) => {
  const {
    staff,
    paymentMode,
    dateOfPayment,
    selectAccount,
    remark,
    paidAmount,
  } = req.body;
  let newdata = new SalaryPaymentSchema({
    staff,
    paymentMode,
    dateOfPayment,
    selectAccount,
    remark,
    paidAmount,
  });
  newdata.save((d, err) => {
    if (err) return console.log(err);
    return res.json({
      msg: " Salary PAyment is done ",
    });
  });
};

exports.GetSalaryPayment = (req, res, next) => {
  SalaryPaymentSchema.find({}, (err, list) => {
    if (err) return console.log(err);
    return res.send({ SalaryPayment: list });
  });
};
