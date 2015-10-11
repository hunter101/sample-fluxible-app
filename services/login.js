import passport from 'passport';
import debugLib from 'debug';
const debug = debugLib('fluxible-example');

module.exports = {
    name: 'login',
    create: function(req, resource, params, body, config, done) {
        console.log("create loginService fired");
        passport.authenticate('local', function(err, user, info) {
            debug('returned user', user);
            if(err || !user) {
                debug('Auth failed');
                return done(err);
            }

            req.logIn(user, function(err2) {
                if(err2) {
                    debug('Login failed');
                    return done(err2);
                }

                return done(err, {
                    user: user
                });
            });
        })(req, req.res, done);
    }
};
