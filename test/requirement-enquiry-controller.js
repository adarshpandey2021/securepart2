/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const factory = require('./handler-factory');

chai.use(chaiHttp);
const { expect } = chai;

const path = '/requirementEnquiry';
const data = {
  requirementNo: 'P00000006',
  date: '04/28/2021',
  category: 'Repair And Maintenance',
  purchaseRepresentative: 'Someone unknown',
  vendorName: 'Sun',
  enquireDate: '04/30/2021'
};

const updateSuccessful = factory.updateSuccessful(
  path,
  { vendorName: '' },
  'vendorName'
);

const basicTests = factory.basicTesting(path, data, updateSuccessful);

describe('requirement-enquiry-controller', basicTests);

// const sinon = require('sinon');
// const faker = require('faker');

// const getAllSuccessful = factory.getAllSuccessful(path);
// const createTestSuccessful = factory.createTestSuccessful(path, data);
// const getOneSuccessful = factory.getOneSuccessful(path);

// const deleteSuccessful = factory.deleteSuccessful(path);
// const getOneErrorTest = factory.getOneErrorTest(path);
// const deleteErrorTest = factory.deleteErrorTest(path);
// const updateErrorTest = factory.updateErrorTest(path);

// describe('requirement-controller', function() {
//   describe('/getAll', function() {
//     it('should show status code 200 for successfully', getAllSuccessful);
//   });
//   describe('/post', function() {
//     it('should pass create test', createTestSuccessful);
//   });
//   describe('/get/id', function() {
//     it('should pass get One test', getOneSuccessful);
//     it('should throw error of status  404 if id is not found', getOneErrorTest);
//   });
//   describe('/update/id', function() {
//     it('should pass update One test', updateSuccessful);
//     it('should throe error of  404 if id is not found', updateErrorTest);
//   });
//   describe('/deleted/id', function() {
//     it('should pass delete test', deleteSuccessful);
//     it('should throw error of  404 if id is not found', deleteErrorTest);
//   });
// });

// const getErrorForId = async function() {
//   const enquiry = await chai
//     .request(host)
//     .post(path)
//     .set('content-type', 'application/x-www-form-urlencoded')
//     .send({
//       requirementNo: 'P00000006',
//       date: '04/28/2021',
//       category: 'Repair And Maintenance',
//       purchaseRepresentative: 'Someone unknown',
//       vendorName: 'Sun',
//       enquireDate: '04/30/2021'
//     });
//   // console.log(enquiry);
//   const result = await chai
//     .request('http://localhost:8000')
//     .patch('/requirementEnquiry/E00000')
//     .set('content-type', 'application/x-www-form-urlencoded')
//     .send({});

//   // console.log(result.body);
//   expect(result).to.have.property('statusCode',  404 if id is not found);
//   expect(result.body).to.have.deep.property(
//     'message',
//     'No Requirement found of this Id.'
//   );
// };

// const EnquiryModel = require('../model/vendor/enquiry');
// const factory = require('./handler-factory');

// const { req } = factory;
// req.params = {
//   id: 'E0001'
// };
// req.body.updateData = { data: 'abcd' };
// req.body.status = {};
// // updateEnquiry();

// const headers = "'content-type', 'application/x-www-form-urlencoded";

// const getSuccessful = async function() {
//   // sinon.stub(EnquiryModel, 'findByIdAndUpdate');

//   const result = await chai.request(host).get('/requirementEnquiry');

//   // console.log(result);
//   expect(result).to.have.property('statusCode', 200);
//   expect(result.body).to.have.deep.property('status', 'success');
// };
