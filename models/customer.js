'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here'
      Customer.belongsTo(models.User)
      // Customer.hasMany(models.Transaction)
      Customer.belongsToMany(models.Shoe , {through: 'Transaction'})

      Customer.hasMany(models.Transaction)
    }
  }
  Customer.init({
    username: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};