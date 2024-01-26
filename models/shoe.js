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
      stock: {
        type :DataTypes.INTEGER,
        allowNull: false,
        validate :{
          notNull:{
            msg : 'Stock cannot be NUll'
          },
          notEmpty :{
            msg : 'Stock cannot be empty'
          }
        }
      },
      price: {
        type :DataTypes.INTEGER,
        allowNull: false,
        validate :{
          notNull:{
            msg : 'Price cannot be NUll'
          },
          notEmpty :{
            msg : 'Price cannot be empty'
          }
        }
      },
      imageUrl: {
        type :DataTypes.STRING,
        allowNull: false,
        validate :{
          notNull:{
            msg : 'ImageURL cannot be NUll'
          },
          notEmpty :{
            msg : 'ImageURL cannot be empty'
          }
        }
      },
      BrandId: {
        type :DataTypes.INTEGER,
        allowNull: false,
        validate :{
          notNull:{
            msg : 'BrandId cannot be NUll'
          },
          notEmpty :{
            msg : 'BrandId cannot be empty'
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Shoe",
    }
  );
  return Shoe;
};
