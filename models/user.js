'use strict';
import _ from 'underscore';
import roles from '../configs/roles';

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
                // associations can be defined here
            }
        },
    });
    return User;
};
