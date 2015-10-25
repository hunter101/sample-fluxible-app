'use strict';

module.exports = function (sequelize, DataTypes) {
  var File = sequelize.define('File', {
      "filename": {
        type: DataTypes.STRING,
        allowNull: false
      },
      "type": {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          File.belongsTo(models.Listing, {foreignKey: 'listingId'});
          File.belongsTo(models.User, {foreignKey: 'userId'});
        }
      },
      getterMethods: {
        preview: function () {
          return "/assets/uploads/" + this.getDataValue('filename');
        }
      }
    }
  );

  return File;
};
