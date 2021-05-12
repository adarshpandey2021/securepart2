/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const factory = require('./handler-factory');

chai.use(chaiHttp);
const { expect } = chai;

const path = '/leaveApplication';
const data = {
  employeeId: 'E000000101',
  employee: 'E000000101',
  employeeName: 'JamesSupportStaffGardner',
  departmentName: 'Support Staff',
  role: 'Gardner',
  departmentId: 'D0005',
  roleId: 'R00018',
  typeOfLeave: 'medicalLeave',
  noOfDays: '2',
  reason: 'To Have Fun what else',
  majorTasks: 'Some Very Important task is due.',
  contactNo: 96598565
};

const updateSuccessful = factory.updateSuccessful(
  path,
  { employeeName: '' },
  'employeeName'
);

const basicTests = factory.basicTesting(path, data, updateSuccessful);

describe('leave-application-controller', basicTests);
