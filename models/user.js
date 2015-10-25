'use strict';
import _ from 'underscore';
import roles from '../config/roles';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        facebookId: DataTypes.STRING,
        displayName: DataTypes.STRING,
        profileUrl: DataTypes.STRING,
        role: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                User.hasMany(models.File, {foreignKey: 'userId'});
                User.hasMany(models.Listing, {foreignKey: 'userId'});
            }
        },
        getterMethods: {
            type : function () {
                return "user"
            }
        }
    });
    return User;
};
