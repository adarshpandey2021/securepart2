const express = require('express');

const enquiryController = require('../../controller/purchaseManagement/requirementEnquiry');

const router = express.Router();
router.patch('/updateStatus/:id', enquiryController.updateEnquiryStatus);

router
  .route('/')
  .get(enquiryController.getAllEnquiry)
  .post(enquiryController.createEnquiry);

router
  .route('/:id')
  .get(enquiryController.getOneEnquiry)
  .patch(enquiryController.updateEnquiry)
  .delete(enquiryController.deleteEnquiry);

module.exports = router;
