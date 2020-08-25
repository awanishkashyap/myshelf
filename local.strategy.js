var passport = require('passport');
var { Strategy } = require('passport-local');

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: username,
        passwordField: password
    }, (username, password, done) => {
        var user = {
            username, password
        };
        done(null, user);
    }
    ));
};