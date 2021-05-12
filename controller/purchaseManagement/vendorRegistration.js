const vendor = require('../../model/vendor/vendorInfo');
const factory = require('../handlerFactory');

exports.createVendorRegistration = factory.createOne(vendor);
exports.updateVendorRegistration = factory.updateOne(vendor);
exports.getOneVendorRegistration = factory.getOne(vendor);
exports.getAllVendorRegistration = factory.getAll(vendor);
exports.deleteVendorRegistration = factory.deleteOne(vendor);
