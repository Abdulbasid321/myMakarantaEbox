// const passport = require('passport');
// const passportJWT = require('passport-jwt');
// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;
// const Admin = require('../model/Admin'); 

// passport.use(
//   new JWTStrate
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET || 'poiuytrewqasdfghjklmnbvcxz',
//     },
//     async (jwtPayload, done) => {
//       try {
//         const admin = await Admin.findById(jwtPayload.data.id);
//         if (admin) {
//           return done(null, admin);
//         } else {
//           return done(null, false);
//         }
//       } catch (error) {
//         return done(error, false);
//       }
//     } 
//   )
// );


// module.exports = passport;
