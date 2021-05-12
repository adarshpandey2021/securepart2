/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const factory = require('./handler-factory');

chai.use(chaiHttp);
const { expect } = chai;

const path = '/leavePolicy';
const data = {
  departmentName: 'Support Staff',
  departmentId: 'D0004',
  roleId: 'R00017',
  role: 'Gardener',
  typeOfLeave: 'Other Leaves',
  gazettedHolidays: [
    {
      holiday: 'Holi',
      date: '04/10/2021',
      dayOfTheWeek: 'Monday'
    }
  ]
};

const updateSuccessful = factory.updateSuccessful(path, { role: '' }, 'role');

const basicTests = factory.basicTesting(path, data, updateSuccessful);

describe('leave-policy-controller', basicTests);
