const express = require('express');
const employeeController = require('../../controller/employeeManagement/createEmployee');
const employeeNoController = require('../../controller/employeeManagement/employeeNoGeneration');

const router = express.Router();

router.get('/employeeNo', employeeNoController.getEmployeeNo);

router
  .route('/employee')
  .post(employeeController.createEmployee)
  .get(employeeController.getEmployees);

router
  .route('/employee/:id')
  .get(employeeController.getEmployee)
  .patch(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

router.get('/allEmployeeNo', employeeController.getEmployeeNo);

module.exports = router;
