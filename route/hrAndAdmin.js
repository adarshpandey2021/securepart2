const express = require('express');
const router = express.Router();

const {
  CreateDepartment,
  GetCreateDepartment,
  CreateRole,
  GetCreateRole,
  CreateHolidays,
  GetCreateHolidays,
  Vacancy,
  GetVacancy,
  Notification,
  GetNotification
} = require('../controller/hrAndAdmin');

const hrAndAdminController = require('../controller/hrAndAdmin');
//// Create Department
router.post('/createdepartment', CreateDepartment);
router.get('/getcreatedepartment', GetCreateDepartment);

router
  .route('/department/:id')
  .get(hrAndAdminController.getSingleDepartment)
  .patch(hrAndAdminController.updateDepartment)
  .delete(hrAndAdminController.deleteDepartment);

router.get('/departmentName', hrAndAdminController.getDepartmentName);

// create route
router.post('/createrole', CreateRole);
router.get('/getcreaterole', GetCreateRole);

router
  .route('/role/:id')
  .get(hrAndAdminController.getSingleRole)
  .patch(hrAndAdminController.updateRole)
  .delete(hrAndAdminController.deleteRole);

router.get('/roleName/:id', hrAndAdminController.getRoleNameForDepartment);

///create holiday
router.post('/createholiday', CreateHolidays);
router.get('/getcreateholiday', GetCreateHolidays);

/// Vacancy requisition

router.post('/vacancy', Vacancy);
router.get('/getvacancy', GetVacancy);

//generate notification
router.post('/jobnotify', Notification);
router.get('/getjobnotify', GetNotification);

module.exports = router;
