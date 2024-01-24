"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.belongsTo(models.User);
      Customer.belongsToMany(models.Shoe, {
        through: models.Transaction,
        foreignKey: "CustomerId",
        otherKey: "ShoeId",
      });
      Customer.hasMany(models.Transaction);
      // define association here
    }
  }
  Customer.init(
    {
      username: DataTypes.STRING,
      balance: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
