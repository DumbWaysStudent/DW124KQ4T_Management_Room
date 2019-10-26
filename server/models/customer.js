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
  };
  return customer;
};