const passport = require('passport');
const jwt = require('express-jwt');
const config = require('../config');

function getToken(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

var auth = {
  signin: passport.authenticate('local', { session: false }),
  required: jwt({
    secret: config.jwt.secret,
    userProperty: 'user',
    getToken,
  }),
  optional: jwt({
    secret: config.jwt.secret,
    userProperty: 'user',
    credentialsRequired: false,
    getToken,
  }),
};

module.exports = auth;
