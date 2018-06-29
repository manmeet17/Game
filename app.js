var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
var {router} = require('./routes/index');
var helmet=require('helmet');
var sockets=require('socket.io');
var allSockets=require('./controllers/socketController');
require("dotenv").config();
var app = express();
var io=sockets();
app.io=io;


mongoose.connect(process.env.LOCAL_DATABASE_URL).then(() =>{
  console.log("Connected to db");
})
.catch((err) => console.log("Error connecting to Database: "+err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

allSockets(io);

module.exports = app;
