'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn(
          'Users',
          'role',
          {
              type: Sequelize.INTEGER,
              allowNull: false,
              defaultValue: 1
          }
      );
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.removeColumn(
          'Users',
          'role'
      );
  }
};
