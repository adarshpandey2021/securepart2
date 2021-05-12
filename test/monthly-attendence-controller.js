/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const factory = require('./handler-factory');

chai.use(chaiHttp);
const { expect } = chai;

const path = '/monthlyAttendance';
const data = {
  employeeId: '0004',
  employee: '6087d11f03ca17359caf676d',
  employeeName: 'JonAdmin',
  departmentId: '6087cdbf9bde891ddc84d03c',
  roleId: '6087ce399bde891ddc84d050',
  departmentName: 'Admin',
  role: 'Sr. TGT',
  salaryHead: 'Basic',
  monthEffectiveFrom: 'Mon, 19 Apr 2021 10:06:09 GMT',
  bankNameAndBranch: 'Icici, Annand Vihar',
  bankAccountNo: '66978554566255',
  IFSCCode: 'ICICI66697'
};
const updateSuccessful = factory.updateSuccessful(
  path,
  { employeeId: '' },
  'employeeId'
);

const basicTests = factory.basicTesting(path, data, updateSuccessful);

describe('monthly-attendance-controller', basicTests);
