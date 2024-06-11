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
      async (jwtPayload, callback) => {
        try {
          const user = await User.findByPk(jwtPayload.sub);

          if (user) {
            return callback(null, user.dataValues);
          }

          return callback(null, false, { message: 'User not found' });
        } catch (err) {
          return callback(err);
        }
      }
    )
  );
};
