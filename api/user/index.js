const jwt = require('jsonwebtoken');
const router = require('express').Router();
const debug = require('debug')('block:api:user');
const _ = require('lodash');
const moment = require('moment');
const uuid = require('uuid').v4;

const User = require('../../models').user;

const config = require('../../config').jwt;
const auth = require('../../auth/middleware');

const tokenForUser = (user) => {
  var exp = moment().add('days', config.validity).toDate();

  user = _.pick(user,
    ['email','first_name', 'last_name', 'password', 'created_date', 'updated_date']);
  user.exp = parseInt(exp.getTime() / 1000);
  return jwt.sign(user, config.secret);
};

router.get('/', function(req, res) {
  res.json({title: 'My Node.js Application'})
})

router.post('/', async (req, res, next) => {
  debug('create req.user:', req.body);
  const {email, password, first_name, last_name} = req.body;
  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({error: 'You must provide email, password, first_name, last_name'});
  }
  try {
    const user = req.body;
    const saved = await User.create(req.body);
    user.user_id = saved.user_id;
    debug('New user saved successfully', user);
    res.json({ token: tokenForUser(user) });
  } catch (err) {
    debug('/post error', err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({error: 'Email is in use'});
    }
    next(err);
  }
});


router.get('/(:id)',
    //auth.required,
    async (req, res, next) => {
  debug('get req.user:', req.user);
  try {
    let user = await User.findOne({where: {id: req.params.id}});
    user && (user = user.toJSON()) && (delete user.user_id, delete user.password);
    res.json(user);
  } catch(err) {
    debug('/get user error', err);
    next(err);
  }
});

router.put('/(:id)',
    //auth.required,
    async (req, res, next) => {
  debug('update req.user:', req.params.id);
  try {
    const {email} = req.body;
    if (!email) {
      return res.status(400).json({error: 'You must provide email'});
    }
    let user = await User.update({email: req.body.email},{where: {id: req.params.id}}),
        resp = {'message' : 'done'};
    res.json(resp);
  } catch(err) {
    debug('/get user error', err);
    next(err);
  }
});

router.delete('/(:id)',
    //auth.required,
    async (req, res, next) => {
  debug('delete req.user:', req.params.id);
  try {
    let user = await User.destroy({where: {id: req.params.id}});
    resp = {'message' : 'done'};
    res.json(resp);
  } catch(err) {
    debug('/get user error', err);
    next(err);
  }
});



module.exports = router;