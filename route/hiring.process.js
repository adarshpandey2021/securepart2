const express = require('express');

const router = express.Router();
const multer = require('multer');

const hiringController = require('../controller/hiring.process');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.fieldname);
  }
});

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
  // fileFilter: fileFilter
});

router
  .route('/applicationForm')
  .post(
    upload.fields([
      { name: 'uploadEmployeePhoto', maxCount: 1 },
      { name: 'uploadEmployeeCv', maxCount: 1 }
    ]),
    hiringController.setEmployeeDetails
  )
  .get(hiringController.getEmployeeDetails);

router.get('/applicationFormPhoto/:id', hiringController.getEmployeePhoto);
router.get('/applicationFormCv/:id', hiringController.getEmployeeCv);

router.patch('/shortlist/hiring/:id', hiringController.shortlistingForHiring);

router.post(
  '/notification/screening/:id',
  hiringController.sendNotificationOfScreening
);
router.post(
  '/notification/interview/:id',
  hiringController.sendNotificationForInterview
);
router.post(
  '/notification/offerLetter/:id',
  upload.single('offerLetter'),
  hiringController.sendNotificationForOfferLetter
);

router
  .route('/applicationForm/:id')
  .get(hiringController.getEmployee)
  .patch(hiringController.updateApplicationForm)
  .delete(hiringController.deleteApplicationForm);

// router.post('/date', hiringController.setDate);
// router.get('/date', hiringController.getDate);
// router.patch('/shortlist/interview', hiringController.shortlistingForInterview);

// router.patch('/shortlist', hiringController.setShortList);

// router.patch('/offerletteracceptance', hiringController.offerLetterAcceptance);
// shortlist

// For selected Employee
// router.get('/shortlisted', hiringController.getShortListed);

// For shortlisting

// send notification

module.exports = router;
