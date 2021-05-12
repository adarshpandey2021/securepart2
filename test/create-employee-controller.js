/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const factory = require('./handler-factory');

chai.use(chaiHttp);
const { expect } = chai;

const id = 'E0' + faker.random.alphaNumeric(7);
const path = '/createEmployee/employee';
const data = {
  firstName: 'JamesSupportStaff',
  middleName: 'No middle',
  lastName: 'Snow',
  bloodGroup: 'B-',
  gender: 'Male',
  dateOfBirth: '01/01/1991',
  nationality: 'Uk',
  consent: 'true',
  contactDetails: [
    {
      street: 'Street No 45',
      city: 'London',
      state: 'North Uk',
      pincode: '121212',
      yearsOfExperience: '2',
      nearestLandmark: 'Big Ben',
      primaryEmail: faker.name.firstName() + '@gmail.com',
      secondaryEmail: faker.name.firstName() + '@gmail.com',
      primaryContact: Math.floor(Math.random() * 10000000),
      secondaryContact: Math.floor(Math.random() * 10000000),
      emergencyContact: Math.floor(Math.random() * 10000000),
      relation: 'Spy'
    }
  ],
  joiningDetails: [
    {
      employeeId: id,
      dateOfJoining: '07/04/2021',
      confirmationDate: '10/04/2021',
      noticePeriod: '10d',
      dateOfRetirement: '07/04/2035'
    }
  ],
  workingDetails: [
    {
      employeeId: id,
      departmentName: 'Support Staff',
      role: 'Gardner',
      workingHours: '8',
      workingEmailId: 'jonsnow22@gmail.com',
      workingMobileNo: '66987754',
      workingPhoneNo: '445688',
      department: 'D0004',
      roleId: 'R000018'
    }
  ],
  familyDetails: [
    {
      name: 'Rina',
      relation: 'Spouse',
      contactNo: '888785464'
    },
    {
      name: 'Ron',
      relation: 'Son',
      contactNo: '888785464'
    }
  ],
  bankDetails: [
    {
      bankAccountNo: 123456789987,
      bankNameAndBranch: 'Icici Bank, Delhi Branch',
      IFSCCode: 'ICIC0006654'
    }
  ]
};

// console.log(data);

const updateSuccessful = factory.updateSuccessful(
  path,
  { nationality: '' },
  'nationality'
);

const basicTests = factory.basicTesting(path, data, updateSuccessful);

describe('create-employee-controller', basicTests);
