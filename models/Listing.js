'use strict';
var _ = require('underscore');

module.exports = function (sequelize, DataTypes) {
    var Listing = sequelize.define('Listing', {
        "title": {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        "listingImage": {
            type: DataTypes.BLOB
        },
        "description": {
            type: DataTypes.STRING,
            allowNull: true
        },
        "category": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "options": {
            type: DataTypes.STRING,
            allowNull: true,
            get: function () {
                var allOptions = require('./extras/listingOptions');
                var selectedOptions = JSON.parse(this.getDataValue('options'));
                return {
                    all: _.map(allOptions, function (option) {
                        option.selected = _.contains(selectedOptions, option.value);
                        option.selected = _.contains(selectedOptions, option.value);
                        return option;
                    }),
                    selected: selectedOptions
                }
            },
            set: function (value) {
                return this.setDataValue('options', JSON.stringify(value));
            }
        },
        "price": {
            type: DataTypes.STRING
        },
        "phone": {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        "email": {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        "address": {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        "suburb": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "state": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "postcode": {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                Listing.hasMany(models.Review, {foreignKey: 'listingId'});
                Listing.hasMany(models.File, {foreignKey: 'listingId'});
                Listing.belongsTo(models.User, {foreignKey: 'userId'});
            }
        },
        getterMethods: {
        }
    });

    return Listing;
};
