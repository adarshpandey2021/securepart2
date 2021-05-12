/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const factory = require('./handler-factory');

chai.use(chaiHttp);
const { expect } = chai;

const path = '/vendorRegistration';
const data = {
  vendorCategory: 'House Keeping',
  nameOfTheOrganization: 'House Keeping Ltd.',
  ownerName: 'Sun',
  GSTINNo: '9665555221ASDF6',
  bankNameAndBranch: 'Icici Meerut',
  bankAccountNumber: 784455412235,
  IFSCCode: 'ICICIC78445',

  address: [
    {
      street: 'Street No 45',
      city: 'Meerut',
      state: 'North Uk',
      pincode: '121212',
      yearsOfExperience: '2',
      nearestLandmark: 'Big Ben',
      primaryEmail: 'jackRsder@gmail.com',
      secondaryEmail: 'jonsnsd546@gmail.com',
      primaryContact: '9959644759',
      secondaryContact: '8959585988',
      panCardNo: 622154877
    }
  ]
};

const updateSuccessful = factory.updateSuccessful(
  path,
  { ownerName: '' },
  'ownerName'
);

const basicTests = factory.basicTesting(path, data, updateSuccessful);

describe('vender-registration-controller', basicTests);
