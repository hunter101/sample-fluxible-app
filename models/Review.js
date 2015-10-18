'use strict';

module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
      "name": {
        type: DataTypes.STRING,
        allowNull: false
      },
      "email": {
        type: DataTypes.STRING,
        allowNull: false
      },
      "pros": {
        type: DataTypes.STRING,
        allowNull: false
      },
      "cons": {
        type: DataTypes.STRING,
        allowNull: false
      },
      "food": {
        type: DataTypes.INTEGER,
        validate: {len: [1, 5]}
      },
      "staff": {
        type: DataTypes.INTEGER,
        validate: {len: [1, 5]}
      },
      "value": {
        type: DataTypes.INTEGER,
        validate: {len: [1, 5]}
      },
      "atmosphere": {
        type: DataTypes.INTEGER,
        validate: {len: [1, 5]}
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Review.belongsTo(models.Listing, {foreignKey: 'listingId'});
        }
      },
      getterMethods: {
        total: function () {
          var acc = this.getDataValue('food') + this.getDataValue('staff') + this.getDataValue('value') + this.getDataValue('atmosphere');
          var total = Math.round(acc / 4);
          return total;
        }
      },
    }

  );

  return Review;
};
