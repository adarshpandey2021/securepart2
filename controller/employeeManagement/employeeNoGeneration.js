const Counter = require('../../model/counter');
const catchAsync = require('../../utils/catchAsync');
const respond = require('../../utils/respond');
// const counter = require("../../utils/counter");

const pad = (num, size) => {
  num = num.toString();
  while (num.length < size) num = '0' + num;
  return num;
};

exports.getEmployeeNo = catchAsync(async (req, res, next) => {
  let counter = await Counter.findByIdAndUpdate(
    { _id: 'employeeNo' },
    { $inc: { seq: 1 } },
    { new: true }
  );

  if (!counter) counter = await Counter.create({ _id: 'employeeNo' });
  const value = `E${pad(counter.seq, 8)}`;
  return respond(res, 200, value);
});
