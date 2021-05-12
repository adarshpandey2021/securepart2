const HiringProcessNotificationDetails = require('../../model/hiringProcess/hiringProcess.notification.model');
const factory = require('../../controller/handlerFactory');

exports.getAllHiringProcessNotification = factory.getAll(
  HiringProcessNotificationDetails
);

exports.deleteHiringNotification = factory.deleteOne(
  HiringProcessNotificationDetails
);
exports.getHiringProcessNotification = factory.getOne(
  HiringProcessNotificationDetails
);
exports.updateHiringNotification = factory.updateOne(
  HiringProcessNotificationDetails
);
exports.setHiringProcessNotification = factory.createOne(
  HiringProcessNotificationDetails
);

// exports.setHiringProcessNotification = catchAsync(async (req, res, next) => {
//   const {
//     department,
//     startDate,
//     lastDate,
//     jobProfile,
//     jobDescription,
//     skills,
//     qualification,
//     role
//   } = req.body;

//   const hiringNotification = await HiringProcessNotificationDetails.create({
//     department,
//     startDate,
//     lastDate,
//     jobProfile,
//     jobDescription,
//     skills,
//     qualification,
//     role
//   });

//   return respond(res, 201, hiringNotification);
// });
