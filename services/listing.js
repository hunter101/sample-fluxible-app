import models from '../models';

module.exports = {
    name: 'listing',
    read: function (req, resource, params, config, callback) {

        // If called with an auth param,
        // Restrict access to listings created
        // by the current user.
        if (params.auth) {
            if (!req.user) {
                var err = new Error('You must be logged in to access this page');
                err.statusCode = 403;
                return callback(err);
            }
            params.userId = req.user.id;
            delete params.auth;
        }
        if (params.id) {
            models.Listing.find({
                where: params,
                include: [
                    {model: models.File}
                ]
            }).then((listing) => {
                if (!listing) {
                    var err = new Error('No listing found');
                    err.statusCode = 404;
                    return callback(err);
                }
                callback(null, listing)
            })
        } else {
            models.Listing.findAll({
                include: [
                    {model: models.File}
                ]
            })
                .then((listings) => {
                    callback(null, listings)
                });
        }
    },
    create: function (req, resource, params, body, config, callback) {
        models.Listing.create(params)
            .then((listing) => {
                callback(null, listing)
            })
            .catch(function (error) {
                console.log(error);
                callback(error);
            });
    },
    update: function (req, resource, params, body, config, callback) {
        models.Listing.update(
            params,
            {
                where: {
                    id: params.id
                }
            })
            .then((listing) => {
                callback(null, listing)
            });
    },
};
