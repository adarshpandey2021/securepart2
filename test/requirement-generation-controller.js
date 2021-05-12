/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const factory = require('./handler-factory');

chai.use(chaiHttp);
const { expect } = chai;

const path = '/requirementGeneration';
const data = {
  category: 'Repair And Maintenance',
  purpose: 'To keep the fan and light working',
  itemName: 'Lights',
  quantity: '51',
  expectedDate: '04/30/2021',
  lastDate: '05/15/2021'
};

const updateSuccessful = factory.updateSuccessful(
  path,
  { itemName: '' },
  'itemName'
);

const basicTests = factory.basicTesting(path, data, updateSuccessful);

describe('requirement-generation-controller', basicTests);
