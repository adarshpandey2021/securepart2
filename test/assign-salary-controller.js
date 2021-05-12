/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const factory = require('./handler-factory');

chai.use(chaiHttp);
const { expect } = chai;

const path = '/assignSalaryStructure';
const data = {
  employeeId: 'E00000002',
  employeeName: 'JamesTransportTransportIncharge',
  employee: 'E00000002',
  departmentId: 'D0003',
  roleId: 'R00010',
  department: 'Transport',
  role: 'Transport Incharge',
  salaryHeads: [
    { _id: 'SS00019', salaryHead: 'Basic' },
    { _id: 'SS00017', salaryHead: 'PF' }
  ],
  monthEffectiveFrom: 'Mon, 19 Apr 2021 10:06:09 GMT',
  bankNameAndBranch: 'Icici, Annand Vihar',
  bankAccountNo: '66978554566255',
  IFSCCode: 'ICICI66697'
};

const updateSuccessful = factory.updateSuccessful(
  path,
  { employeeName: '' },
  'employeeName'
);

const basicTests = factory.basicTesting(path, data, updateSuccessful);

describe('assign-salary-structure-controller', basicTests);
