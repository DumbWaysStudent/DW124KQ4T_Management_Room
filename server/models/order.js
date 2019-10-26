'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    customerId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN,
    isBooked: DataTypes.BOOLEAN,
    orderEndTime: DataTypes.DATE,
    duration: DataTypes.INTEGER
  }, {});
  order.associate = function(models) {
    // associations can be defined here
    order.belongsTo(models.customer, {
      as: "customer",
      foreignKey: 'customerId'
    });
    order.belongsTo(models.room, {
      foreignKey: 'roomId',
      as: 'room'
    });
  };
  return order;
};