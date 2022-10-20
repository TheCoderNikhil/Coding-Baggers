const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User')
const { validatePassword } = require('./customFunctions')

module.exports = function (passport) {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (username, password, done) {
      User.findOne({ email: username }, async function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        
        const isPasswordCorrect = await validatePassword(password, user.password);
        if (!isPasswordCorrect) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ))
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}


