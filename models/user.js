"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Customer, { foreignKey: "UserId" });
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          if (user.password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(user.password, salt);
            user.password = hash;
            user.role = `Customer`;
          }
        },
        beforeUpdate: (user) => {
          if (user.password) {
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );
  return User;
};
