/* eslint-disable mocha/no-exports */
/* eslint-disable no-undef */
// const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
// const sinon = require('sinon');
const faker = require('faker');

chai.use(chaiHttp);
const { expect } = chai;

const host = 'http://localhost:8000';

exports.host = host;

let id = '';

exports.getAllSuccessful = path =>
  async function() {
    const result = await chai.request(host).get(path);
    if (result.body.data.data[0])
      // eslint-disable-next-line no-underscore-dangle
      id = result.body.data.data[0]._id || id;

    expect(result).to.have.property('statusCode', 200);
    expect(result.body).to.have.deep.property('status', 'success');
    expect(result.body)
      .to.have.deep.property('results')
      .to.be.a('number');
    expect(result.body.data)
      .to.have.property('data')
      .to.be.an('array');
  };

exports.createTestSuccessful = (path, data) =>
  async function() {
    const result = await chai
      .request(host)
      .post(path)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(data);
    // eslint-disable-next-line no-underscore-dangle
    id = result.body.data.data._id;
    // console.log(result.body.data);
    expect(result).to.have.property('statusCode', 201);
    expect(result.body).to.have.property('status', 'success');
    // expect(result.body).to.have.property('message', msg);
    expect(result.body.data.data).to.have.property('_id');
  };

exports.getOneSuccessful = path =>
  async function() {
    const result = await chai.request(host).get(`${path}/${id}`);
    expect(result).to.have.property('statusCode', 200);
    expect(result.body).to.have.deep.property('status', 'success');
    expect(result.body.data).to.have.property('data').to.not.be.null;
    expect(result.body.data.data.deleted).to.equal(false);
  };

exports.deleteSuccessful = path =>
  async function() {
    const result = await chai.request(host).delete(`${path}/${id}`);
    expect(result).to.have.property('statusCode', 204);
  };

exports.updateSuccessful = (path, data, fieldName) =>
  async function() {
    const fake = faker.name.firstName();
    data[fieldName] = fake;
    const result = await chai
      .request(host)
      .patch(`${path}/${id}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(data);

    expect(result).to.have.property('statusCode', 200);
    expect(result.body).to.have.property('status', 'success');
    expect(result.body.data).to.have.property('data').to.not.be.null;
    expect(result.body.data.data[fieldName]).to.equal(fake);
  };

exports.getOneErrorTest = path =>
  async function() {
    const result = await chai.request(host).get(`${path}/1`);
    expect(result).to.have.property('statusCode', 404);
    expect(result.body).to.have.property('status', 'fail');
    // expect(result.body).to.have.property(
    //   'message',
    //   'No document found with that ID'
    // );
  };

exports.deleteErrorTest = path =>
  async function() {
    const result = await chai.request(host).delete(`${path}/1`);
    expect(result).to.have.property('statusCode', 404);
    expect(result.body).to.have.property('status', 'fail');
    // expect(result.body).to.have.property(
    //   'message',
    //   'No document found with that ID'
    // );
  };

exports.updateErrorTest = path =>
  async function() {
    const result = await chai
      .request(host)
      .patch(`${path}/1`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({});
    expect(result).to.have.property('statusCode', 404);
    expect(result.body).to.have.property('status', 'fail');
    expect(result.body).to.have.property('message');
  };

exports.basicTesting = (
  path,
  data,
  updateSuccessful,
  getAll,
  getOne,
  create
) => {
  const getAllSuccessful = getAll || this.getAllSuccessful(path);
  const createTestSuccessful = create || this.createTestSuccessful(path, data);
  const getOneSuccessful = getOne || this.getOneSuccessful(path);
  // const updateSuccessful = this.updateSuccessful(
  //   path,
  //   { vendorName: '' },
  //   'vendorName'
  // );
  const deleteSuccessful = this.deleteSuccessful(path);
  const getOneErrorTest = this.getOneErrorTest(path);
  const deleteErrorTest = this.deleteErrorTest(path);
  const updateErrorTest = this.updateErrorTest(path);

  return function() {
    describe('/getAll', function() {
      it('should show status code 200 for successfully', getAllSuccessful);
    });
    describe('/post', function() {
      it('should pass create test', createTestSuccessful);
    });
    describe('/get/id', function() {
      it('should pass get One test', getOneSuccessful);
      it(
        'should throw error of status  404 if id is not found',
        getOneErrorTest
      );
    });
    describe('/update/id', function() {
      it('should pass update One test', updateSuccessful);
      it('should throe error of  404 if id is not found', updateErrorTest);
    });
    describe('/deleted/id', function() {
      it('should pass delete test', deleteSuccessful);
      it('should throw error of  404 if id is not found', deleteErrorTest);
    });
  };
};

// exports.dbConnection = async () => {
//   await mongoose.connect(
//     'mongodb://127.0.0.1:27017/testingDb?directConnection=true',
//     {
//       useFindAndModify: true,
//       useUnifiedTopology: true,
//       useNewUrlParser: true
//     }
//   );
// };

// exports.dbClose = async () => {
//   await mongoose.connection.close();
// };

// exports.res = {
//   statusCode: 500,
//   data: null,
//   status(code) {
//     this.statusCode = code;
//     return this;
//   },
//   json(data) {
//     this.data = data;
//   }
// };

// exports.req = {
//   body: {}
// };

// exports.next = () => {};

// exports.createOneTest = async (Model, data) => {
//   return Model.create(data);
// };

// exports.deleteAll = async Model => {
//   return Model.deleteMany({});
// };

// exports.noDbResponseTest = async function(url) {
//   // sinon.stub(Model, functionName);
//   // Model.functionName.throws();
//   // const result = await fn(req, res, next);
//   const result = await chai.request('http://localhost:8000').get(url);

//   // expect(result).to.be.an('error');
//   // expect(result).to.have.property('statusCode', 500);
//   expect(result).to.have.property('statusCode', 200);
//   expect(result.body).to.have.deep.property('status', 'success');
//   // Model.functionName.restore();
// };
