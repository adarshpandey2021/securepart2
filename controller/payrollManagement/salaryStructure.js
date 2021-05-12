/* eslint-disable no-param-reassign */
const SalaryStructure = require('../../model/finance/payroll/salaryStructure');
const factory = require('../../controller/handlerFactory');
const catchAsync = require('../../utils/catchAsync');
const nextError = require('../../utils/nextError');
const respond = require('../../utils/respond');
// const logger = require('../../utils/logger');

exports.getAllSalaryStructure = factory.getAll(SalaryStructure);
exports.getSingleSalaryStructure = factory.getOne(SalaryStructure);
exports.updateSalaryStructure = factory.updateOne(SalaryStructure);
exports.deleteSalaryStructure = factory.deleteOne(SalaryStructure);
// exports.createSalaryStructure = factory.createOne(SalaryStructure);

exports.createSalaryStructure = catchAsync(async (req, res, next) => {
  const data = req.body;
  const check = await SalaryStructure.findOne({
    department: data.department,
    role: data.role,
    salaryHead: data.salaryHead
  });

  if (check) {
    return nextError(
      next,
      'The department and the role already has this salary structure.',
      400
    );
  }

  const salary = await SalaryStructure.create(req.body);

  return respond(res, 201, salary, 'The salary structure is created.');
});

// { $project:
//   { adjustedGrades:
//      {
//        $map:
//           {
//             input: "$quizzes",
//             as: "grade",
//             in: { $add: [ "$$grade", 2 ] }
//           }
//      }
//   }
// }
exports.getGrossSalary = catchAsync(async (req, res, next) => {
  // const { departmentId, roleId } = req.query;
  const earningQuery = await SalaryStructure.aggregate([
    // {
    //   $match: {} // departmentId, roleId, type: 'Earning'
    // },
    {
      $group: {
        _id: { roleId: '$roleId', type: '$type' },
        roleEarning: {
          $sum: '$amount'
        }
      }
    },
    {
      $project: {
        _id: 0,
        roleId: '$_id.roleId',
        type: '$_id.type',
        amount: '$roleEarning'
      }
    }
    // {
    //   $group: {
    //     _id: '$roleId',
    //     earning: {
    //       $max: '$amount'
    //     },
    //     deduction: {
    //       $min: '$amount'
    //     }
    //   }
    // },
    // {
    //   $project: {
    //     _id: 0,
    //     roleId: '$_id',
    //     earning: 1,
    //     deduction: 1
    //   }
    // }
  ]);

  // logger.info(earningQuery, 'The result of the aggregate.');

  // console.log(earningQuery);

  const basicSalaries = await SalaryStructure.find({
    salaryHead: 'Basic'
  });

  // logger.info(basicSalaries[0], 'The basic salary object');
  const filteredSalaries = [];
  basicSalaries.forEach(basicSalary => {
    basicSalary.grossSalary = 0;
    earningQuery.forEach(grossForRole => {
      if (basicSalary.roleId === grossForRole.roleId)
        if (grossForRole.type === 'Earning')
          basicSalary.grossSalary += grossForRole.amount;
        else basicSalary.grossSalary -= grossForRole.amount;
    });
    // console.log(basicSalary);
    filteredSalaries.push({
      gross: basicSalary.grossSalary,
      department: basicSalary.department,
      role: basicSalary.role,
      amount: basicSalary.amount,
      salaryHead: basicSalary.salaryHead,
      roleId: basicSalary.roleId,
      departmentId: basicSalary.departmentId,
      _id: basicSalary.salaryStructureNo,
      annualIncrement: basicSalary.annualIncrement,
      monthlyIncrement: basicSalary.monthlyIncrement
    });
  });
  // console.log(filteredSalaries);
  // if (!basicSalary) {
  //   return nextError(
  //     next,
  //     'No Basic salary present for this department, role',
  //     400
  //   );
  // }

  return respond(
    res,
    200,
    filteredSalaries,
    'The basic and the gross for the role',
    filteredSalaries.length
  );
});

// let earningAmount = 0;
// let deductionAmount = 0;

// if (earningQuery && earningQuery[0]) earningAmount = earningQuery[0].earnings;

// if (deductionQuery && deductionQuery[0])
//   deductionAmount = deductionQuery[0].deduction;

// data.gross = earningAmount - deductionAmount;

// const roleIdCollection = await Promise.all(
//   earningQuery.map(async department => {
//     const role = await SalaryStructure.aggregate([
//       {
//         $match: {
//           roleId: department.roleId._id,
//           departmentId: department.departmentId,
//           type: 'Earning'
//         }
//       }
//       // {
//       //   $group: {
//       //     _id: '$roleId',
//       //     earning: {
//       //       $sum: '$amount'
//       //     }
//       //   }
//       // }
//     ]);
//     return role;
//   })
// );
// console.log(earningQuery);
// console.log(earningQuery[1].roleId);

// const deductionQuery = await SalaryStructure.aggregate([
//   {
//     $match: { departmentId, roleId, type: 'Deduction' }
//   },
//   {
//     $group: {
//       _id: null,
//       deduction: {
//         $sum: '$amount'
//       }
//     }
//   }
// ]);

// {
//   $group: {}
// }
// {
//   $group: {
//     _id: '$departmentId',
//     roleId: {
//       $push: '$$ROOT'
//     }
//   }
// },
// {
//   $project: {
//     computedRole: {
//       $map: {
//         input: '$roleId',
//         as: 'role',
//         in: { $sum: '$$role.amount' }
//       }
//     },
//     roleId: '$roleId.roleId'
//   }
// }
// {
//   $match: {}
// },
// {
//   $group: {
//     _id: '$departmentId',
//     roleId: { $addToSet: '$roleId' },
//     type: { $addToSet: '$type' },
//     amount: { $addToSet: '$amount' }
//   }
// }

// exports.createSalaryStructure = async (req, res, next) => {
//   try {
//     const {
//       department,
//       departmentId,
//       roleId,
//       role,
//       salaryHead,
//       type
//     } = req.body;

//     const salaryStructure = await SalaryStructure.create({
//       department,
//       departmentId,
//       roleId,
//       role,
//       salaryHead,
//       type
//     });

//     return res.status(201).json({
//       status: true,
//       data: salaryStructure,
//       message: 'The salary structure is created'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getCustomSalaryStructure = async (req, res, next) => {
//   try {
//     req.body.deleted = false;
//     const salaryStructure = await SalaryStructure.find(req.body);
//     if (!salaryStructure)
//       throw new Error(
//         'No data is found with this query. Please change the fields'
//       );

//     return res.status(200).json({
//       status: true,
//       data: salaryStructure,
//       message: 'The list of the Salary Structure'
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getAllSalaryStructure = async (req, res, next) => {
//   try {
//     const allSalaryStructure = await SalaryStructure.find({ deleted: false });

//     if (!allSalaryStructure || !allSalaryStructure.length)
//       throw new Error("No salary structure is present");

//     return res.status(200).json({
//       status: true,
//       data: allSalaryStructure,
//       message: "The list of the Salary Structure",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.getSingleSalaryStructure = async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     const salaryStructure = await SalaryStructure.findById(id);
//     if (!salaryStructure)
//       throw new Error("No salary structure of this id is present");

//     return res.status(200).json({
//       status: true,
//       data: salaryStructure,
//       message: "Fetched the salary structure",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.updateSalaryStructure = async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     const salaryStructure = await SalaryStructure.findOneAndUpdate(
//       {_id:id,deleted:false},
//       req.body,
//       { new: true }
//     );
//     if(!salaryStructure) throw new Error("No salary structure is present for this Id")
//     return res.status(201).json({
//       status: true,
//       data: salaryStructure,
//       message: "Updated the salary structure",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };

// exports.deleteSalaryStructure = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const salaryStructure = await SalaryStructure.findByIdAndUpdate(
//       id,
//       { deleted: true },
//       { new: true }
//     );
//     return res.status(200).json({
//       status: true,
//       data: salaryStructure,
//       message: "Deleted the salary structure",
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message, status: false });
//   }
// };
