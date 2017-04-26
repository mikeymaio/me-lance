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
  console.log(req.user);
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'Not logged in' });
  // }
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
        console.error('error on 40 = ' + err);
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
      console.error('error on 54 = ' + err);
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
      console.error('error on 82 = ' + err);
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

  const clientId = req.params.id

  Client
  .findByIdAndRemove(clientId)
  .exec()
  .then(client => res.status(204).json({message: client}).end())
  .catch(err => res.status(500).json({message: 'Internal server error: ' + err }));
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
    .catch(err => res.status(500).json({message: 'error on 162 = ' + err}));
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

  const updateableFields = ['clientName', 'projectName', 'rate', 'ratePer', 'budget', 'startDate', 'endDate', 'totalTimeSpent', 'timeSpentThisBill', 'billingCycle', 'notes', 'completed'];

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
      const updatedProjects = client.projects;
      return Client.update({_id: clientId}, {$set: {projects: updatedProjects}});
    })
    .then( () => {
      res.status(200).json({message: 'Success!'});
    })
    .catch(err => res.status(500).json({message: 'error on 214 = ' + err}));
});


// DELETE PROJECT

router.delete('/:id/projects/:projectId', (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'Not logged in' });
  // }
  const clientId = req.params.id;
  const projectId = req.params.projectId;

  Client
  .findByIdAndUpdate(clientId, {
    $pull: {
        projects: {_id: new mongoose.Types.ObjectId(projectId)}
    }
  }, {new: true})
  .exec()
  .then( () => res.status(200).json({message: 'Success!'}).end() )
  .catch(err => res.status(500).json({message: 'Something went wrong: ' + err}));
});




// ADD INVOICE

router.post('/:id/projects/:projectId/invoices', (req, res) => {
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

  const newInvoice = req.body;
  newInvoice._id = new mongoose.Types.ObjectId;
  newInvoice.dateCreated = new Date().toISOString();
  newInvoice.dateModified = new Date().toISOString();
  const clientId = req.params.id;
  const projectId = req.params.projectId;

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
      client.projects[i].invoices.push(newInvoice);
      const updatedInvoices = client.projects;
      return Client.update({_id: clientId}, {$set: {projects: updatedInvoices}});
    })
    .then( () => {
      res.status(200).json({message: 'Success!'});
    })
    .catch(err => res.status(500).json({message: 'error on 214 = ' + err}));
});


// UPDATE INVOICE

router.put('/:id/projects/:projectId/invoices/:invoiceId', (req, res) => {
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

  const updateableFields = ['billingPeriodStart', 'billingPeriodEnd', 'tasks', 'tax'];

  const clientId = req.params.id;
  const projectId = req.params.projectId;
  const invoiceId = req.params.invoiceId;
  const invoice = req.body;

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
      const project = client.projects[i];
      console.log(project);
      const j = project.invoices.findIndex((invoice) => invoice._id.toString() === invoiceId);
      if (j === -1) {
        return res.status(404).json({message: 'Invoice not found'});
      }

      updateableFields.forEach(field => {
        if (field in invoice) {
          client.projects[i].invoices[j][field] = invoice[field];
        }
      });

      client.projects[i].invoices[j].dateModified = new Date().toISOString();
      const updatedInvoices = client.projects;

      return Client.update({_id: clientId}, {$set: {projects: updatedInvoices}});
    })
    .then( () => {
      res.status(200).json({message: 'Success!'});
    })
    .catch(err => res.status(500).json({message: 'error on 214 = ' + err}));
});


// DELETE INVOICE

router.delete('/:id/projects/:projectId/invoices/:invoiceId', (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'Not logged in' });
  // }
  const clientId = req.params.id;
  const projectId = req.params.projectId;
  const invoiceId = req.params.invoiceId;

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
    const j = client.projects[i].invoices.findIndex((invoice) => invoice._id.toString() === invoiceId);
    if (j === -1) {
      return res.status(404).json({message: 'Invoice not found'});
    }

    client.projects[i].invoices.splice(j, 1);
    const updatedInvoices = client.projects;
    return Client.update({_id: clientId}, {$set: {projects: updatedInvoices}});
  })
  // .exec()
  .then( () => res.status(200).json({message: 'Success!'}).end() )
  .catch(err => res.status(500).json({message: 'Something went wrong: ' + err}));
});




module.exports = router;