const express = require('express');

const router = express.Router();

const hiringController = require('../../controller/hiringProcessNotification/hiringProcessController');

router
  .route('/')
  .get(hiringController.getAllHiringProcessNotification)
  .post(hiringController.setHiringProcessNotification);

router
  .route('/:id')
  .get(hiringController.getHiringProcessNotification)
  .patch(hiringController.updateHiringNotification)
  .delete(hiringController.deleteHiringNotification);

module.exports = router;
