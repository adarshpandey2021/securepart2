/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const factory = require('./handler-factory');

chai.use(chaiHttp);
const { expect } = chai;

const path = '/hiringProcessNotification';
const data = {
  department: 'Finance',
  startDate: '11/05/2021',
  lastDate: '16/05/2021',
  jobProfile: 'Experienced teacher in the Maths',
  jobDescription: 'Get to teach in the Good Environment',
  skills: 'Atleast 8 Year of experience in teaching',
  qualification: 'Under Graduation',
  role: 'Accounting'
};

const updateSuccessful = factory.updateSuccessful(
  path,
  { jobProfile: '' },
  'jobProfile'
);

const basicTests = factory.basicTesting(path, data, updateSuccessful);

describe('hiring-process-notification-controller', basicTests);
