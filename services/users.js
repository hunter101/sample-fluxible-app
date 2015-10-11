import models from '../models';

module.exports = {
    name: 'user',
    // at least one of the CRUD methods is required
    read: function (req, resource, params, config, callback) {
        models.User.findAll()
            .then((users) => {
                callback(null, users)
            });
    },
    create: function (req, resource, params, body, config, callback) {
        console.log(params);
        models.User.create({
            username: params.username,
            password: params.password,
            role: 1
        })
            .then((user) => {
                callback(null, user)
            });
    }
};
