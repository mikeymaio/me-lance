/* eslint-disable */

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const { User } = require('../models/user-model');
const { Client } = require('../models/client-model');

const {app, runServer, closeServer} = require('../index.js');
const {TEST_DATABASE_URL, PORT} = require('../config');

let port;
let databaseUrl;

chai.use(chaiHttp);

const agent = chai.request.agent(app)

// TEST USER

const TEST_USER = {
  "userName": "testUser",
  "email": "testuser@test.com",
  "password": "testPassword",
  "passwordConfirm": "testPassword",
  "firstName": "John",
  "lastName": "Doe",
}

let _user;

// Seed client Collection

function seedClientData(user) {
  console.info('seeding client data');
  const seedData = [];

  for (let i = 1; i <= 5; i++) {
    seedData.push(generateClientData(user));
  }
  return Client.insertMany(seedData);
}


function generateProject(user) {

  const ratePer = ['hr', 'fixed'];

  const project = {
    projectName: faker.lorem.words(),
    clientName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    rate: faker.random.number(),
    ratePer: ratePer[Math.floor(Math.random() * ratePer.length)],
    notes: faker.lorem.sentences(),
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    completed: faker.random.boolean(),
    invoices: generateInvoices(),
    userId: user.userId
  };
  return project;
};

function generateInvoices() {
  const invoice = {
    invoiceNo: faker.random.number(),
    tax: faker.random.number(),
    billingPeriodStart: faker.date.past(),
    billingPeriodEnd: faker.date.future(),
    tasks: generateTasks()
  };
  return invoice[Math.floor(Math.random() * 3)];
};

function generateTasks() {
  const task = {
    date: faker.date.recent(),
    description: faker.lorem.sentences(),
    hoursSpent: faker.random.number()
  };
  return task[Math.floor(Math.random() * 3)];
};


// generate fake Client

function generateClientData(user) {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    company: faker.company.companyName(),
    phone: faker.phone.phoneNumber(),
    address: `${faker.address.streetAddress()} ${faker.address.streetName()} ${faker.address.city()} ${faker.address.stateAbbr} ${faker.address.zipCode}`,
    projects: generateProject(user),
    dateCreated: new Date(),
    dateModified: new Date(),
    userId: user.userId
  };
};



// TEAR DOWN DB
function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
};


describe('TEST Me-Lance App', function() {

// API Client Endpoint Tests


  before(function () {
    return runServer(port=3001, databaseUrl=TEST_DATABASE_URL)
  });


  beforeEach(function () {
    //let _user;
    return chai.request(app)
      .post('/api/users')
      .send(TEST_USER)
      .then(function (res) {
        _user = res.body;
        return agent
          .post('/api/users/login')
          .send({
            username: "testUser",
            password: "testPassword"
          })
      })
      .then(function () {
        return seedClientData(_user);
      })
  });

  afterEach(function () {
    return tearDownDb()
  });

  after(function () {

    return closeServer();

  });



  ////////////////////////////////////////////////////////////
  describe(' TEST Client API Endpoint', function () {



    describe('GET endpoint', function () {

      it('should return all clients', function () {
        let res;
        return agent
          .get(`/api/clients?userId=${this.userId}`)
          .then(function (_res) {
            res = _res;
            res.should.have.status(200);
            res.body.clients.should.have.length.of.at.least(1);
            return Client.count();
          })
          .catch(err => console.log('error get /api/clients', err))
          .then(function (count) {
            res.body.clients.should.have.length.of(count);
          })
          .catch(err => console.log('error on test 1'));
      });



      it('should return clients with right fields', function () {
        let resClient;
        return agent
          .get(`/api/clients?userId=${this.userId}`)
          .then(function (res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.clients.should.be.a('array');
            res.body.clients.should.have.length.of.at.least(1);

            res.body.clients.forEach(function (client) {
              client.should.be.a('object');
              client.should.include.keys(
                'firstName', 'lastName', 'userName', 'projects');
            });
            resClient = res.body.clients[0];
            return Client.findById(resClient.id);
          })
          .then(function (client) {
            resClient.firstName.should.equal(client.firstName);
            resClient.lastName.should.equal(client.lastName);
            resClient.userName.should.equal(client.userName);
            resClient.projects.should.deep.equal(client.projects);
          })
          .catch(err => console.log('error on test 2'));
      });
    });

    ////////////////////////////////////////////////////////////

    describe('POST endpoint', function () {
      it('should add a new client', function () {

        const newClient = generateClientData(_user);
        return agent
          .post('/api/clients')
          .send(newClient)
          .then(function (res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.include.keys(
              'firstName', 'lastName', 'company', 'phone', 'projects','address', 'userId');
            res.body.firstName.should.equal(newClient.firstName);
            res.body.lastName.should.equal(newClient.lastName);
            res.body.company.should.equal(newClient.company);
            res.body.phone.should.equal(newClient.phone);
            res.body.projects.should.deep.equal(newClient.projects);
            res.body.address.should.equal(newClient.address);
            res.body.userId.should.equal(newClient.userId);
            return Client.findById(res.body.clientId);
          })
          .then(function (client) {
            client.firstName.should.equal(newClient.firstName);
            client.lastName.should.equal(newClient.lastName);
            client.company.should.equal(newClient.company);
            client.phone.should.equal(newClient.phone);
            client.projects.should.deep.equal(newClient.projects);
            client.address.should.equal(newClient.address);
            client.userId.should.equal(newClient.userId);
          })
          .catch(err => console.log(err));
      });
    });

    ////////////////////////////////////////////////////////////

    describe('PUT endpoint', function () {

      it('should update requested fields', function () {
        const updateData = {
          phone: '555-555-1234',
          address: '123 Main St Somewhere CA 90018'
        };
        // return agent
        Client
          .findOne()
          .exec()
          .then(function (client) {
            updateData.id = client.id;
            return chai.request(app)
              .put(`/api/clients/${client.id}`)
              .send(updateData);
          })
          .then(function (res) {
            res.should.have.status(204);

            return Client.findById(updateData.id).exec();
          })
          .then(function (client) {
            client.phone.should.equal(updateData.phone);
            client.address.should.equal(updateData.address);
          })
          .catch(err => console.log(err));
      });
    });


    ////////////////////////////////////////////////////////////

    describe('DELETE endpoint', function () {
      it('should delete a client by id', function () {
        let client;
        // return agent
        Client
          .findOne()
          .exec()
          .then(function (_client) {
            client = _client;
            return chai.request(app).delete(`/api/clients/${client.id}`);
          })
          .then(function (res) {
            res.should.have.status(204);
            return Client.findById(client.id).exec();
          })
          .then(function (_client) {
            should.not.exist(_client);
          })
          .catch(err => console.log(err));
      })
    });
  });
});
