const passport = require('passport');
const LocalStrategy = require('passport-local');

const debug = require('debug')('block:passport');
const User = require('../models').user;

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  debug(`Verifying user ${email}`);
  try {
    const user = await User.findOne({ where: {email} });
    if (!user) {
      return done(null, false);
    } else {
      const match = await user.comparePassword(password);
      if (!match) {
        return done(null, false);
      }
      return done(null, user);
    }
  } catch (err) {
    done(err);
  }
});

passport.use(localLogin);
