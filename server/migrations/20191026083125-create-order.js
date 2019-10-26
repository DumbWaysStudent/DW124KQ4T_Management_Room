'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'customers',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      roomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'rooms',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      isDone: {
        type: Sequelize.BOOLEAN
      },
      isBooked: {
        type: Sequelize.BOOLEAN
      },
      orderEndTime: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};