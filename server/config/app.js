let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();
let cors = require('cors')
let userModel = require('../model/User');
let User = userModel.User;

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let taskRouter = require('../routes/task')

let session = require('express-session')
let passport = require('passport')
let passportLocal = require('passport-local')
let flash = require('connect-flash')

// Authentication
passport.use(User.createStrategy());
let localStrategy = passportLocal.Strategy;

const mongoose = require('mongoose');
let DB = require('./db');

// MongoDB connection
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', () => {
  console.log('MongoDB Connected');
});
mongoose.connect(DB.URI, { useNewURIParser: true, useUnifiedTopology: true });

app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// Initialize flash
app.use(flash());

// Serialize and deserialize user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Use routers
app.use('/', indexRouter);  // Handle routes like /home, /login, etc.
app.use('/users', usersRouter);
app.use('/', taskRouter);  // Ensure this handles /tasklist

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
