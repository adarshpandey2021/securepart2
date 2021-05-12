/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const factory = require('./handler-factory');

chai.use(chaiHttp);
const { expect } = chai;

const path = '/earlyOrLate';
const data = {
  employeeId: 'E00000004',
  employeeName: 'JamesSupportStaffGardner',
  departmentName: 'Support Staff',
  employee: 'E00000004',
  role: 'Gardner',
  departmentId: 'D0004',
  roleId: 'R00017',
  typeOfLeave: 'Early Departure',
  description: 'Due to the traffic',
  arrivalOrDepartureTime: 'Tue, 13 Apr 2021 06:09:51 GMT'
};

const updateSuccessful = factory.updateSuccessful(
  path,
  { employeeName: '' },
  'employeeName'
);

const basicTests = factory.basicTesting(path, data, updateSuccessful);

describe('early-or-late-controller', basicTests);
