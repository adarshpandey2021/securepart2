const express = require('express');

const employeeLeavePolicyController = require('../../controller/leaveManagement/employeeLeavePolicy');

const router = express.Router();

router
  .route('/')
  .get(employeeLeavePolicyController.getEmployeeLeavePolicy)
  .post(employeeLeavePolicyController.setEmployeeLeavePolicy);

router.patch(
  '/gazettedHolidays/:id',
  employeeLeavePolicyController.updateGazettedLeave
);

router
  .route('/:id')
  .get(employeeLeavePolicyController.getSingleEmployeeLeavePolicy)
  .patch(employeeLeavePolicyController.updateEmployeeLeavePolicy)
  .delete(employeeLeavePolicyController.deleteEmployeeLeavePolicy);

module.exports = router;
