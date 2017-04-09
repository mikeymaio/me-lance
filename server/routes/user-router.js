'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

mongoose.Promise = global.Promise;


const { User } = require('../models/user-model');

// const localStrategy = new LocalStrategy(function(username, password, callback) {
//   let user;
//   User
//     .findOne({userName: username})
//     .exec()
//     .then(_user => {
//       user = _user;
//       if (!user) {
//         return callback(null, false, {message: 'Incorrect username or password'});
//       }
//       return user.validatePassword(password);
//     })
//     .then(isValid => {
//       if (!isValid) {
//         return callback(null, false, {message: 'Incorrect username or password'});
//       }
//       else {
//         return callback(null, user)
//       }
//     });
// });
// passport.use(localStrategy);
// router.use(() => passport.initialize());

// //router.use(passport.session());

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

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

router.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return res.status(401).json({ message: 'Not logged in' });
  }
  res.status(200).redirect('/dashboard', {
    user: req.user.apiRepr()
  });
})

router.post('/login',
  passport.authenticate('local', {session: true, successRedirect: '/dashboard', failureRedirect: '/login', failureFlash: 'Incorrect username or password'}),
  (req, res) => {
    console.log('user login post made')
    // if (req.body.userName === 'demo' && req.isAuthenticated()) {
  //   //seedDemoInfo();
  // }
  });


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// UPDATE USER

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
  const updateableFields = ['firstName', 'lastName', 'userName', 'email', 'phone', 'address', 'dateModified', 'templates'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  User
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .exec()
    .then(user => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
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