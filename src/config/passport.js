const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport');
const { fetchUserById } = require('../services/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
  passport.use(new JwtStrategy(opts, async (payload, done) => {
    const user = await fetchUserById(payload.userId);

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  }));
}