const express = require('express');

const vendorRegistrationController = require('../../controller/purchaseManagement/vendorRegistration');

const router = express.Router();

router
  .route('/')
  .get(vendorRegistrationController.getAllVendorRegistration)
  .post(vendorRegistrationController.createVendorRegistration);

  router.post("/addcategory",vendorRegistrationController.AddCategory)
  router.get("/getaddcategory",vendorRegistrationController.GetAddCategory)

router
  .route('/:id')
  .get(vendorRegistrationController.getOneVendorRegistration)
  .patch(vendorRegistrationController.updateVendorRegistration)
  .delete(vendorRegistrationController.deleteVendorRegistration);

module.exports = router;
