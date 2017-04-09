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
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not logged in' });
  }
  Client
    .find({ userId: req.user.id })
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
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not logged in' });
  }
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
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not logged in' });
  }
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
      projects: req.body.projects,
      userId: req.user.id
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
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not logged in' });
  }
  // ensure that the id in the request path and the one in request body match
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
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
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not logged in' });
  }
  Client
  .findByIdAndRemove(req.params.id)
  .exec()
  .then(client => res.status(204).end())
  .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = router;