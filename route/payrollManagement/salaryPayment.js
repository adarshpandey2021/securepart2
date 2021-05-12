const express = require('express');

const salaryPaymentController = require('../../controller/payrollManagement/salaryPayment');

const router = express.Router();

// router.get('/custom', salaryPaymentController.getCustomSalaryPayment);

router
  .route('/employeeReceipt/:id')
  .get(salaryPaymentController.getSalaryReceiptForEmployee);

router
  .route('/employee/:id')
  .get(salaryPaymentController.getSalaryPaymentForOneEmployee);

router
  .route('/')
  .get(salaryPaymentController.getAllSalaryPayment)
  .post(salaryPaymentController.createSalaryPayment);
router
  .route('/:id')
  .get(salaryPaymentController.getSingleSalaryPayment)
  .patch(salaryPaymentController.updateSalaryPayment)
  .delete(salaryPaymentController.deleteSalaryPayment);

module.exports = router;
