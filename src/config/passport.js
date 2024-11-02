const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const config = require('./config');
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
      async (email, password, callback) => {
        try {
          passwordFromLogin = password;

          // Match User
          const userByEmail = await User.findOne({ where: { email } });
          if (!userByEmail) {
            return callback(null, false);
          }

          const user = await User.findByPk(userByEmail.personalId);
          if (!user) {
            throw new Error('Usuario no encontrado');
          }

          // Match Password
          User.isPasswordMatch(passwordFromLogin, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return callback(null, user);
            }
            return callback(err);
          });
        } catch (err) {
          return callback(err);
        }
      }
    )
  );

  passport.use(
    'CC_Strategy_jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret,
      },
      async (jwtPayload, callback) => {
        try {
          const user = await User.findByPk(jwtPayload.sub);

          if (user) {
            return callback(null, user.dataValues);
          }

          return callback(null, false, { message: 'Usuario no encontrado' });
        } catch (err) {
          return callback(err);
        }
      }
    )
  );
};
