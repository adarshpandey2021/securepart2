const express = require('express');
const requirementsController = require('../../controller/purchaseManagement/requirementGeneration');

const router = express.Router();

router.patch('/status/:id', requirementsController.updateRequirementStatus);

router
  .route('/')
  .get(requirementsController.getAllRequirements)
  .post(requirementsController.createRequirements);

router
  .route('/:id')
  .get(requirementsController.getOneRequirements)
  .patch(requirementsController.updateRequirements)
  .delete(requirementsController.deleteRequirements);

module.exports = router;
