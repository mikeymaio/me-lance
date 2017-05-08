'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;


const { User } = require('../models/user-model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

// USERS

  // Sign Up/Create User

router.post('/', (req, res) => {
  console.log(req.body);
  if (req.body.password !== req.body.passwordConfirm) {
    res.status(500).json({
      message: 'passwords do not match'
    })
  }
  const requiredFields = ['email', 'password'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const encryption = User.hashPassword(req.body.password);
  User
    .create({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      templates: req.body.templates,
      dateCreated: req.body.dateCreated,
      dateModified: req.body.dateModified,
      hashedPassword: encryption.hash,
      salt: encryption.salt
    })
    .then(user => res.status(200).json(user.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'something went wrong',
        error: err
      });
    });
});

  // User Login

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (! user) {
      return res.status(401).json({
      error: 'Incorrect username or password'
    });
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return res.status(401).json({
      error: loginErr
    });
      }
      return res.status(200).json({
      user: req.user.apiRepr(),
      message: `Welcome ${req.user.firstName}!`
    });
    });
  })(req, res, next);
});


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// GET USER BY ID
router.get('/:id', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  User
    .findById(req.params.id)
    .exec()
    .then(user => res.status(201).json({
      user: user.apiRepr(),
      // message: 'Success! Your info has been updated'
    }).end())
    .catch(err => res.status(500).json({message: 'Internal server error: ' + err}));
});

// UPDATE USER

router.put('/:id', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not logged in' });
  }
  // ensure that the id in the request path and the one in request body match
  if (!(req.params.id && req.body.userId && req.params.id === req.body.userId)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.userId}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }
  const toUpdate = {dateModified: new Date().toISOString()};
  const updateableFields = ['firstName', 'lastName', 'userName', 'email', 'phone', 'address', 'dateModified', 'templates', 'timerStart', 'timerRunning'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  User
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .exec()
    .then(user => res.status(201).json({
      user: user.apiRepr(),
      message: 'Success! Your info has been updated'
    }).end())
    .catch(err => res.status(500).json({message: 'Internal server error: ' + err}));
});

// DELETE USER

router.delete('/:id', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not logged in' });
  }
  User
  .findByIdAndRemove(req.params.id)
  .exec()
  .then(user => res.status(204).end())
  .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = router;