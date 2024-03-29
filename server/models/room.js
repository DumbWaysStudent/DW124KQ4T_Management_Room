'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    name: DataTypes.STRING
  }, {});
  room.associate = function(models) {
    // associations can be defined here
    room.hasMany(models.order, {
      foreignKey: 'roomId',
      as: 'checkins'
    });

    room.belongsToMany(models.customer, {
      through: 'orders',
      as: 'customers',
      foreignKey: 'roomId',
      otherKey: 'customerId',
    });
  };
  return room;
};