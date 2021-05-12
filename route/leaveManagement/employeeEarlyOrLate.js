const express = require('express');

const earlyOrLateController = require('../../controller/leaveManagement/employeeArrivalOrDeparture');

const router = express.Router();

router.patch('/update/:id', earlyOrLateController.updateEarlyAndLate);

router
  .route('/')
  .get(earlyOrLateController.getAllEarlyAndLate)
  .post(earlyOrLateController.createEarlyArrivalAndLateDeparture);

router
  .route('/:id')
  .get(earlyOrLateController.getEarlyAndLate)
  .patch(earlyOrLateController.updateStatus)
  .delete(earlyOrLateController.deleteEarlyAndLate);

module.exports = router;
