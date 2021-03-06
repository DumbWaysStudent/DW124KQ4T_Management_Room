'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    name: DataTypes.STRING,
    identityNumber: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  customer.associate = function(models) {
    // associations can be defined here
    customer.hasMany(models.order, {
      foreignKey: 'customerId',
      as: 'checkins'
    });
    customer.belongsToMany(models.room, {
      through: 'orders',
      as: 'rooms',
      foreignKey: 'customerId',
      otherKey: 'roomId'
    });
  };
  return customer;
};