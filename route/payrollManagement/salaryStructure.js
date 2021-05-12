const express = require('express');

const salaryStructureController = require('../../controller/payrollManagement/salaryStructure');

const router = express.Router();

// router.get('/all', salaryStructureController.getAllSalaryStructure);
// router.get('/custom', salaryStructureController.getCustomSalaryStructure);

// router.post('/', salaryStructureController.createSalaryStructure);
router.get('/roleGross', salaryStructureController.getGrossSalary);
router
  .route('/')
  .get(salaryStructureController.getAllSalaryStructure)
  .post(salaryStructureController.createSalaryStructure);

router
  .route('/:id')
  .get(salaryStructureController.getSingleSalaryStructure)
  .patch(salaryStructureController.updateSalaryStructure)
  .delete(salaryStructureController.deleteSalaryStructure);

module.exports = router;
