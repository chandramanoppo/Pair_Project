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
      username: {
        type :DataTypes.STRING,
        allowNull: false,
        validate :{
          notNull:{
            msg : 'Username cannot be NUll'
          },
          notEmpty :{
            msg : 'Username cannot be empty'
          }
        }
      },
      balance: {
        type :DataTypes.INTEGER,
        allowNull: false,
        validate :{
          notNull:{
            msg : 'Balance cannot be NUll'
          },
          notEmpty :{
            msg : 'Balance cannot be empty'
          }
        }
      },
      gender: {
        type :DataTypes.STRING,
        allowNull: false,
        validate :{
          notNull:{
            msg : 'Gender cannot be NUll'
          },
          notEmpty :{
            msg : 'Gender cannot be empty'
          }
        }
      },
      
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
