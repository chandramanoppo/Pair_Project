"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsToMany(models.Profile);
      Transaction.belongsToMany(models.Shoe);
    }
  }
  Transaction.init(
    {
      code: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      CustomerId: DataTypes.INTEGER,
      ShoeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
