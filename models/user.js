'use strict';
import _ from 'underscore';
import roles from '../config/roles';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        facebookId: DataTypes.STRING,
        displayName: DataTypes.STRING,
        profileUrl: DataTypes.STRING,
        role: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                User.hasMany(models.Listing, {foreignKey: 'userId'});
            }
        },
    });
    return User;
};
