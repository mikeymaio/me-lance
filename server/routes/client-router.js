'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const morgan = require('morgan');

mongoose.Promise = global.Promise;

const {
    //PORT,
     DATABASE_URL} = require('../config');

const { Client } = require('../models/client-model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

// GET CLIENT

router.get('/', (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'Not logged in' });
  // }
  console.log(req.query.userId);
  Client
    .find({ userId: req.query.userId })
    // .find({ userId: req.user.id })
    .exec()
    .then(clients => {
      res.json({
        clients: clients.map(
          (client) => client.apiRepr())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

router.get('/:id', (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'Not logged in' });
  // }
  Client
    .findById(req.params.id)
    .exec()
    .then(client =>res.json(client.apiRepr()))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});

// CREATE CLIENT

router.post('/', (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'Not logged in' });
  // }
    Client
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: req.body.company,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      dateCreated: req.body.dateCreated,
      dateModified: req.body.dateModified,
      projects: req.body.projects || [],
      // userId: req.user.id
      userId: req.body.userId
    })
    .then(
      client => res.status(201).json(client.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});






// UPDATE CLIENT

router.put('/:id', (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'Not logged in' });
  // }
  // ensure that the id in the request path and the one in request body match
  if (!(req.params.id && req.body.clientId && req.params.id === req.body.clientId)) {
    const message = (
      `Request path id (${req.params.id}) and request body clientId ` +
      `(${req.body.clientId}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }
  const toUpdate = {dateModified: new Date().toISOString()};
  const updateableFields = ['firstName', 'lastName', 'company', 'email', 'phone', 'address', 'dateModified', 'projects'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Client
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .exec()
    .then(client => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

// DELETE CLIENT

router.delete('/:id', (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'Not logged in' });
  // }
  Client
  .findByIdAndRemove(req.params.id)
  .exec()
  .then(client => res.status(204).end())
  .catch(err => res.status(500).json({message: 'Internal server error'}));
});


// ADD PROJECT

router.post('/:id/projects', (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'Not logged in' });
  // }
  // ensure that the id in the request path and the one in request body match
  if (!(req.params.id && req.body.clientId && req.params.id === req.body.clientId)) {
    const message = (
      `Request path id (${req.params.id}) and request body clientId ` +
      `(${req.body.clientId}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }

  const newProject = req.body;
  newProject._id = new mongoose.Types.ObjectId;
  const clientId = req.params.id;

  Client
    .findByIdAndUpdate(clientId, {$push: {"projects": newProject}})
    .exec()
    .then(client => res.status(204).end())
    .catch(err => res.status(500).json({message: err}));
});

// UPDATE PROJECTS

router.put('/:id/projects/:projectId', (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'Not logged in' });
  // }
  // ensure that the id in the request path and the one in request body match
  if (!(req.params.id && req.body.clientId && req.params.id === req.body.clientId)) {
    const message = (
      `Request path id (${req.params.id}) and request body clientId ` +
      `(${req.body.clientId}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }
  const toUpdate = {dateModified: new Date().toISOString()};
  const updateableFields = ['projects.clientName, projects.rate, projects.ratePer, projects.budget, projects.startDate, projects.endDate, projects.totalTimeSpent, projects.timeSpentThisBill, projects.notes, projects.completed'];

  const clientId = req.params.id;
  const projectId = req.params.projectId;
  const project = req.body;

  Client
    .findById(clientId)
    .exec()
    .then(client => {
      if (!client) {
        return res.status(404).json({message: 'Client not found'});
      }
      const i = client.projects.findIndex((project) => project._id.toString() === projectId);
      if (i === -1) {
        return res.status(404).json({message: 'Project not found'});
      }
      updateableFields.forEach(field => {
        if (field in project) {
          client.projects[i][field] = project[field];
        }
      });
      client.projects[i].dateModified = new Date().toISOString();
      client.save();
      res.status(204).json({message: 'Success!'}).end();
    })
    .catch(err => res.status(500).json({message: err}));
});


module.exports = router;