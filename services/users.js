import models from '../models';

module.exports = {
    name: 'user',
    read: function (req, resource, params, config, callback) {
        // If called with an auth param,
        // Restrict access to the current logged in user
        if (params.auth) {
            if (!req.user) {
                return callback("Not Logged in", null);
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
                callback(null, user)
            })
        } else {
            models.Listing.findAll({
                include: [
                    {model: models.Listing}
                ]
            })
                .then((user) => {
                    callback(null, user)
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
