const Requirement = require('../../model/vendor/requirementGeneration');
const factory = require('../../controller/handlerFactory');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const respond = require('../../utils/respond');

exports.getAllRequirements = factory.getAll(Requirement);
exports.getOneRequirements = factory.getOne(Requirement);
exports.createRequirements = factory.createOne(Requirement);
exports.deleteRequirements = factory.deleteOne(Requirement);
exports.updateRequirementStatus = factory.updateOne(Requirement);

exports.updateRequirements = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const requirement = await Requirement.findById(id);
  // eslint-disable-next-line no-unused-vars
  const { status, ...updateData } = req.body;

  if (!requirement)
    return next(new AppError('No requirement of this Id.', 404));
  if (
    requirement.status === 'Approve' ||
    requirement.status === 'Modify And Approve'
  ) {
    return next(
      new AppError("Requirement is already approved you can't change it.", 404)
    );
  }

  const updatedRequirement = await Requirement.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true
    }
  );
  return respond(res, 200, updatedRequirement);
});
