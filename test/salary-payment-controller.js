/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const factory = require('./handler-factory');

chai.use(chaiHttp);
const { expect } = chai;

const path = '/salaryPayment';
const data = {
  employeeId: 'E00000001',
  employeeName: 'JamesAcademicPPT',
  employee: 'E00000001',
  departmentId: 'D0001',
  roleId: 'R00001',
  department: 'Academics',
  role: 'PPT',
  totalWorkingDays: '21',
  actualWorkingDays: '13',
  dateOfPayment: '04/31/2021',
  remark: 'Payment is payed'
};

sinon.stub(factory, 'updateSuccessful');
sinon.stub(factory, 'updateErrorTest');
factory.updateSuccessful.returns(() => true);
factory.updateErrorTest.returns(() => true);

const updateSuccessful = factory.updateSuccessful(
  path,
  { remark: '' },
  'remark'
);

const basicTests = factory.basicTesting(path, data, updateSuccessful);

describe('salary-payment-controller', basicTests);

factory.updateErrorTest.restore();
factory.updateSuccessful.restore();
