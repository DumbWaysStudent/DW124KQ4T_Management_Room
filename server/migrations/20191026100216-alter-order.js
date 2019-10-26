'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.sequelize.transaction((t) => {
    return Promise.all([
        queryInterface.addColumn('orders', 'duration', {
            type: Sequelize.INTEGER
        }, { transaction: t }),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.sequelize.transaction((t) => {
    return queryInterface.removeColumn('orders', 'duration', { transaction: t })
    })
  }
};
