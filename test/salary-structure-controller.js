/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const factory = require('./handler-factory');

chai.use(chaiHttp);
const { expect } = chai;

const path = '/salaryStructure';
const data = {
  department: 'Support Staff',
  departmentId: 'D0004',
  roleId: 'R00018',
  role: 'Conductor',
  salaryHead: 'CCA',
  amount: 4520,
  type: 'Earning'
};

const updateSuccessful = factory.updateSuccessful(
  path,
  { salaryStructureNo: '' },
  'salaryStructureNo'
);

const getGrossSalaryTestSuccessFul = async function() {
  const result = await chai
    .request(factory.host)
    .get(`${path}/roleGross?departmentId=D0003&roleId=R00010`);
  // console.log(result.body);
  expect(result).to.have.property('statusCode', 200);
  expect(result.body).to.have.deep.property('status', 'success');
  expect(result.body.data).to.have.property('data').to.not.be.null;
  expect(result.body.data.data[0])
    .to.have.deep.property('gross')
    .to.be.a('number');
};

const basicTests = factory.basicTesting(path, data, updateSuccessful);

describe('salary-structure-controller', function() {
  basicTests;
  describe('get/roleGross', function() {
    it(
      'should show the status code 200 and contains the gross',
      getGrossSalaryTestSuccessFul
    );
  });
});
