const PurchaseAgreement = require('../../model/vendor/purchaseAgreement');
const factory = require('../handlerFactory');

exports.getAllPurchaseAgreement = factory.getAll(PurchaseAgreement);
exports.getOnePurchaseAgreement = factory.getOne(PurchaseAgreement);
exports.createPurchaseAgreement = factory.createOne(PurchaseAgreement);
exports.updatePurchaseAgreement = factory.updateOne(PurchaseAgreement);
exports.deletePurchaseAgreement = factory.deleteOne(PurchaseAgreement);
