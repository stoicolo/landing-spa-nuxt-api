const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');

const { User } = require('../models');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = () => {
  let passwordFromLogin = '';

  passport.use(
    'CC_Strategy_local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, callback) => {
        passwordFromLogin = password;

        return User.findOne({ where: { email } })
          .then((user, err) => {
            // Match User
            if (!user) {
              return callback(null, false);
            }

            return User.findByPk(user.personalId)
              .then((user, err) => {
                if (!user) {
                  throw new Error(err);
                }

                // Match Password
                User.isPasswordMatch(passwordFromLogin, user.password, (err, isMatch) => {
                  if (err) throw err;
                  if (isMatch) {
                    return callback(null, user);
                  }
                  return callback(err);
                });
              })
              .catch((err) => callback(err));
          })
          .catch((err) => callback(err));
      }
    )
  );

  passport.use(
    'CC_Strategy_jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'CC_24',
      },
      (jwtPayload, callback) => {
        // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findByPk(jwtPayload.sub)
          .then((user) => {
            return callback(null, user.dataValues);
          })
          .catch((err) => {
            return callback(err);
          });
      }
    )
  );
};
