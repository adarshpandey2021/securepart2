const express = require('express');

const assignSalaryStructureController = require('../../controller/payrollManagement/assignSalaryStructure');

const router = express.Router();

// router.get('/all', assignSalaryStructureController.getAllAssignSalaryStructure);
// router.get(
//   '/custom',
//   assignSalaryStructureController.getCustomAssignSalaryStructure
// );

// router.post('/', assignSalaryStructureController.createAssignSalaryStructure);

router.get('/gross', assignSalaryStructureController.getAllAssignSalaryStructureAndGross);

router
  .route('/')
  .get(assignSalaryStructureController.getAllAssignSalaryStructure)
  .post(assignSalaryStructureController.createAssignSalaryStructure);

router
  .route('/:id')
  .get(assignSalaryStructureController.getSingleAssignSalaryStructure)
  .patch(assignSalaryStructureController.updateAssignSalaryStructure)
  .delete(assignSalaryStructureController.deleteAssignSalaryStructure);

// router.get(
//   '/singleEmployee/:id',
//   assignSalaryStructureController.getAllSalaryHeadForSingleEmployee
// );

module.exports = router;
