const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');


const { User } = require('./models/user-model');

mongoose.Promise = global.Promise;

const {
    //PORT,
     DATABASE_URL} = require('./config');

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));
app.use(cookieParser());


app.use(passport.initialize());
app.use(passport.session());

const localStrategy = new LocalStrategy(function(username, password, callback) {
  console.log('strategy start', username, password);
  let user;
  User
    .findOne({userName: username})
    .exec()
    .then(_user => {
      user = _user;
      if (!user) {
        return callback(null, false, {message: 'Incorrect username or password'});
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect username or password'});
      }
      else {
        return callback(null, user)
      }
    });
});

passport.use(localStrategy);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const userRouter = require('./routes/user-router');
const clientRouter = require('./routes/client-router');

app.use('/api/users', userRouter);
app.use('/api/clients', clientRouter);


// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});


let server;
function runServer(port=3001, databaseUrl=DATABASE_URL) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}


function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
