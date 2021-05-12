const express = require('express');

const purchaseAgreementController = require('../../controller/purchaseManagement/purchaseAgreementController');

const router = express.Router();

router
  .route('/')
  .get(purchaseAgreementController.getAllPurchaseAgreement)
  .post(purchaseAgreementController.createPurchaseAgreement);

router
  .route('/:id')
  .get(purchaseAgreementController.getOnePurchaseAgreement)
  .post(purchaseAgreementController.updatePurchaseAgreement)
  .delete(purchaseAgreementController.deletePurchaseAgreement);

module.exports = router;
