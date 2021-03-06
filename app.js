const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
//const session = require('express-session');
//const csrf = require('csrf');
const accessLogger = require('morgan');
const moment = require('moment-timezone');
const app = express();
const log4js = require('log4js');
const logDirectory = path.join(__dirname, 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// app access log timezone
accessLogger.token('date', (req, res, tz) => {
  return moment().tz(tz).format();
});

// create a rotating write stream
// @see https://www.npmjs.com/package/file-stream-rotator#example-usage
const fileStreamRotator = require('file-stream-rotator');
const accessLogStream = fileStreamRotator.getStream({
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false,
  date_format: 'YYYY-MM-DD'
});

// setup the access logger
// @see log format https://github.com/expressjs/morgan#predefined-formats
const customFormat = ':date[Asia/Tokyo] :http-version :method :status :url :user-agent :response-time ms';
app.use(accessLogger(customFormat, {stream: accessLogStream}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session setup
/*
var sess = {
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null
  }
};
if (app.get('env') === 'production') {
  app.set('trust proxy', 1);// trust first proxy
  sess.cookie.secure = true;// serve secure cookies
}
app.use(session(sess));
*/

// create csrf token
/*
app.use(csrf());
app.use(function(req, res, next) {
  var token = req.csrfToken();
  res.locals.csrftoken = token;
  next();
});
*/

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// static routes
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/public', express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

log4js.configure('config/applog.json');
const errorLogger = log4js.getLogger('error');

// error handler
app.use(function(err, req, res, next) {
  errorLogger.error(err);// add stacktrace log

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
