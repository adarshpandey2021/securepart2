const vendor = require('../../model/vendor/vendorInfo');
const factory = require('../handlerFactory');
const CategorySchema=require('../../model/vendor/addcategory')

exports.createVendorRegistration = factory.createOne(vendor);
exports.updateVendorRegistration = factory.updateOne(vendor);
exports.getOneVendorRegistration = factory.getOne(vendor);
exports.getAllVendorRegistration = factory.getAll(vendor);
exports.deleteVendorRegistration = factory.deleteOne(vendor);

exports.AddCategory=factory.createOne(CategorySchema)
exports.GetAddCategory=factory.getAll(CategorySchema)
exports.DeleteAddCatgory = factory.deleteOne();
