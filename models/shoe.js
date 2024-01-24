"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shoe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shoe.belongsToMany(models.Customer, {
        through: models.Transaction,
        foreignKey: "ShoeId",
        otherKey: "CustomerId",
      });
      Shoe.hasMany(models.Transaction);
      Shoe.belongsTo(models.Brand);
    }
  }
  Shoe.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
      BrandId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Shoe",
    }
  );
  return Shoe;
};
