const Enquiry = require('../../model/vendor/enquiry');
const factory = require('./../handlerFactory');
const catchAsync = require('../../utils/catchAsync');
// const AppError = require('../../utils/appError');
const respond = require('../../utils/respond');
const nextError = require('../../utils/nextError');

exports.getAllEnquiry = factory.getAll(Enquiry);
exports.getOneEnquiry = factory.getOne(Enquiry);
exports.createEnquiry = factory.createOne(Enquiry);
exports.updateEnquiryStatus = factory.updateOne(Enquiry);
exports.deleteEnquiry = factory.deleteOne(Enquiry);

exports.updateEnquiry = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  // eslint-disable-next-line no-unused-vars
  const { status, ...updateData } = req.body;
  const requirementEnquiry = await Enquiry.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });

  if (!requirementEnquiry)
    return nextError(next, 'No Requirement found of this Id.', 404);

  return respond(
    res,
    200,
    requirementEnquiry,
    'The data is successfully updated.'
  );
});
