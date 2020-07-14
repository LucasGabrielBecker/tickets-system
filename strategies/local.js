const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));



module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async(email, password, done) => {
        //match User
        const user = await User.findOne({ email: email })
        if (!user) {
            return done(null, false, { message: "That email is not registered" })
        }
        //match password
        bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Password incorrect" })
            }
        })

    }));


    

}