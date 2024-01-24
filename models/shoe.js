'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shoe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shoe.belongsTo(models.Brand)

      Shoe.hasMany(models.Transaction)

      Shoe.belongsToMany(models.Customer , {through: 'Transaction'})

    }
  }
  Shoe.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    imageUrl: DataTypes.TEXT,
    BrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shoe',
  });
  return Shoe;
};
