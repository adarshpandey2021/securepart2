const schedule = require('node-schedule');
const Employee = require('../../model/employee/employeeModel');
const employeeLeavePolicyModel = require('../../model/employeeLeave/leavePolicy');
const SalaryPayment = require('../../model/finance/payroll/salaryPayment');

const rule = new schedule.RecurrenceRule();
// eslint-disable-next-line no-unused-vars

rule.date = 1;
rule.hour = 3;
rule.minute = 14;
rule.second = 10;
// rule.minute = 20;
// eslint-disable-next-line no-unused-vars
const job = schedule.scheduleJob(rule, function() {
  const rule = new schedule.RecurrenceRule();
  let getDaysInMonth = function(month, year) {
    return new Date(year, month, 0).getDate();
  };

  rule.date = getDaysInMonth(new Date().getMonth(), new Date().getFullYear());
  rule.hour = 22;
  rule.minute = 58;
  rule.second = 0;
  // rule.minute = 21;
  // eslint-disable-next-line no-unused-vars
  const job = schedule.scheduleJob(rule, async function() {
    try {
      const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
      };

      const sundays = (year, month) => {
        let day, counter, date;

        day = 1;
        counter = 0;
        date = new Date(year, month, day);
        while (date.getMonth() === month) {
          if (date.getDay() === 0)
            // Sun=0, Mon=1, Tue=2, etc.
            counter += 1;

          day += 1;
          date = new Date(year, month, day);
        }
        return counter;
      };

      let totalWorkingDays = 0;
      let noOfSundays = 0;
      let actualWorkingDays = 0;
      const currentMonth = new Date().getUTCMonth();
      const currentYear = new Date().getUTCFullYear();

      const gazettedLeaves = await employeeLeavePolicyModel.findOne({
        departmentName: 'All',
        deleted: false
      });

      // if (!gazettedLeaves || gazettedLeaves.gazettedHolidays.length === 0)
      //   nextError(next, 'No Gazetted Leaves found please add them', 400);

      const noGazettedLeaves = gazettedLeaves.gazettedHolidays.reduce(
        (holidays, e) => {
          if (new Date(e.date).getUTCMonth() === currentMonth)
            if (new Date(e.date).getDay() !== 0) return holidays + 1;
            else return holidays;
          else return holidays;
        },
        0
      );

      totalWorkingDays = getDaysInMonth(currentMonth, currentYear);
      noOfSundays = sundays(currentYear, currentMonth);
      actualWorkingDays = totalWorkingDays - noOfSundays - noGazettedLeaves;

      // const dt = new Date();

      const employees = await Employee.find().populate({
        path: 'roleId',
        select: 'role departmentName'
      });

      for (const doc of employees) {
        try {
          let unPaidLeavesThisMonth = 0;
          let halfPaidLeavesThisMonth = 0;
          let paidLeavesThisMonth = 0;
          if (
            new Date(doc.paidLeavesThisMonth.month).getUTCMonth() <=
            currentMonth
          ) {
            paidLeavesThisMonth = doc.paidLeavesThisMonth.noOfDays;
            actualWorkingDays -= doc.paidLeavesThisMonth.noOfDays;
          }
          if (
            new Date(doc.unPaidLeavesThisMonth.month).getUTCMonth() <=
            currentMonth
          ) {
            unPaidLeavesThisMonth = doc.unPaidLeavesThisMonth.noOfDays;
            actualWorkingDays -= doc.unPaidLeavesThisMonth.noOfDays;
          }
          if (
            new Date(doc.halfPaidLeavesThisMonth.month).getUTCMonth() <=
            currentMonth
          ) {
            halfPaidLeavesThisMonth = doc.halfPaidLeavesThisMonth.noOfDays;
            actualWorkingDays -= doc.halfPaidLeavesThisMonth.noOfDays / 2;
          }

          await SalaryPayment.create({
            employeeId: doc._id,
            employeeName: doc.firstName,
            employee: doc._id,
            departmentId: doc.department,
            roleId: doc.roleId._id,
            department: doc.roleId.departmentName,
            role: doc.roleId.role,
            month: new Date(),
            totalWorkingDays,
            actualWorkingDays,
            unPaidLeavesThisMonth,
            halfPaidLeavesThisMonth,
            paidLeavesThisMonth,
            bankDetails: doc.bankDetails,
            grossSalary:
              (doc.grossSalary / totalWorkingDays) *
              (totalWorkingDays -
                unPaidLeavesThisMonth -
                halfPaidLeavesThisMonth / 2)
          });
        } catch (err) {
          console.log(
            `Can't set the salary payment of the employee ${doc._id}`
          );
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
});
