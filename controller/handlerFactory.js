const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const respond = require('../utils/respond');
const nextError = require('../utils/nextError');

exports.deleteOne = (Model, message) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    const msg = message || 'The Deletion is successful';
    return respond(res, 204, null, msg);
  });

exports.updateOne = (Model, message) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    const msg = message || 'The document is updated.';
    return respond(res, 200, doc, msg);
  });

exports.createOne = (Model, message) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    const msg = message || 'The Creation is successful';
    return respond(res, 201, doc, msg);
  });

exports.getOne = (Model, popOptions, message) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return nextError(next, 'No document found with that ID', 404);
    }

    return respond(res, 200, doc, message);
  });

exports.getAll = (Model, message, status) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    return respond(res, 200, doc, message, doc.length, status);
  });
