/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const factory = require('./handler-factory');
const faker = require('faker');

chai.use(chaiHttp);
const { expect } = chai;

const path = '/hiringProcess/applicationForm';
const data = {
  firstName: 'Jon Snow',
  middleName: 'No middle',
  lastName: 'Snow',
  bloodGroup: 'B-',
  gender: 'Male',
  dateOfBirth: '01/01/1991',
  nationality: 'Uk',
  street: 'Street No 45',
  city: 'London',
  state: 'North Uk',
  pincode: '121212',
  yearsOfExperience: '2',
  nearestLandmark: 'Big Ben',
  primaryEmail: 'jonsnow@gmail.com',
  secondaryEmail: 'jonsnow22@gmail.com',
  primaryContact: '995995699',
  secondaryContact: '896548988',
  contactRelation: 'Spy',
  uploadEmployeePhoto: faker.image.business(),
  uploadEmployeeCv: faker.image.nature(),
  consent: 'true',
  educationQualification: [
    {
      degree: 'Btech',
      college: 'Sant Thomas',
      university: 'USA National University',
      Percentage: '89',
      yearOfPassing: '2010'
    },
    {
      degree: 'Mtech',
      college: 'Sant Thomas',
      university: 'USA National University',
      Percentage: '89',
      yearOfPassing: '2015'
    }
  ],
  professionalQualification: [
    {
      degree: 'Java Course',
      college: 'Sant Thomas',
      university: 'USA National University',
      Percentage: '89',
      yearOfPassing: '2010'
    }
  ]
};

// console.log(data);

const updateSuccessful = factory.updateSuccessful(
  path,
  { lastName: '' },
  'lastName'
);

const basicTests = factory.basicTesting(path, data, updateSuccessful);

// describe('hiring-process-controller', basicTests);
