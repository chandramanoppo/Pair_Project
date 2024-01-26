"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Brand.hasMany(models.Shoe, { foreignKey: "BrandId" });
    }
  }
  Brand.init(
    {
      name: {
        type :DataTypes.STRING,
        allowNull: false,
        validate :{
          notNull:{
            msg : 'Name cannot be NUll'
          },
          notEmpty :{
            msg : 'Name cannot be empty'
          }
        }
      },
      description: {
        type :DataTypes.STRING,
        allowNull: false,
        validate :{
          notNull:{
            msg : 'Description cannot be NUll'
          },
          notEmpty :{
            msg : 'Description cannot be empty'
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Brand",
    }
  );
  return Brand;
};
