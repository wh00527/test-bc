const express = require('express');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
// const history = require('connect-history-api-fallback');
const app = express();
const debug = require('debug')('block:app');

const config = require('./config');
// passport initialize
require('./auth/passport');

// Normal express config defaults
app.use(require('morgan')(config.morgan.format));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// History API fallback
//app.use(history());

// only use in development
if (config.isDevelopmentEnv()) {
  app.use(errorhandler());
}

app.use('/api', require('./api'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  debug(err.stack);

  //if (err instanceof SequelizeValidationError) err.status = 400;
  res.status(err.status || 500);

  res.json({
    'errors': {
      message: err.message,
      error: err,
    },
  });
});

/* eslint-disable no-console */
app.get('/ping', function (req, res) {
  console.log('GET /ping');
  res.json({ success: true, message: 'Service is up' });
});

module.exports = app;