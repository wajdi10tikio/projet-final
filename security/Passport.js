const UserModel = require('../models/users.models')

var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'tikio';

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    //payload howa nafsou eli sna3na bih partie token(id name email role)
    UserModel.findOne({ _id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  }));
}