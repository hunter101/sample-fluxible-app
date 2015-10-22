import models from '../models';

module.exports = {
    name: 'user',
    read: function (req, resource, params, config, callback) {
        // If called with an auth param,
        // Restrict access to the current logged in user
        if (params.auth) {
            if (!req.user) {
                var err = new Error('You must be logged in to access this page');
                err.statusCode = 403;
                return callback(err, null);
            }
            params.userId = req.user.id;
            delete params.auth;
        }
        if (params.id) {
            models.User.find({
                where: params,
                include: [
                    {model: models.Listing}
                ]
            }).then((user) => {
                if (!user) {
                    var err = new Error("No user found in DB, pls ensure you're logged in");
                    err.statusCode = 404;
                    return callback(err, null);
                }
                return callback(null, user);
            });
            // Just spew out a list of users
            // this is only here for testing purposes
            // needs high level of auth otherwise.
        } else {
            models.Listing.findAll({
                include: [
                    {model: models.Listing}
                ]
            })
                .then((user) => {
                    if (!user) {
                        var err = new Error('No user found in DB');
                        err.statusCode = 404;
                        return callback(err, null);
                    }
                });
        }
    },
    create: function (req, resource, params, body, config, callback) {
        console.log(params);
        models.User.create({
            username: params.username,
            password: params.password,
            displayName: params.displayName,
            role: 1
        })
            .then((user) => {
                callback(null, user)
            });
    }
};
