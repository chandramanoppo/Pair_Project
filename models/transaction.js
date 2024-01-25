'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Customer)

      Transaction.belongsTo(models.Shoe)

    }
  }
  Transaction.init({
    code: DataTypes.STRING,
    CustomerId: DataTypes.INTEGER,
    ShoeId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate: (user) => {
        if(user.code){
          const codes = Math.floor(1000 + Math.random() * 9000);
          // console.log(val);
          user.code = codes + '-' + this.CustomerId
        }
      },
      beforeUpdate: (user) => {
        const codes = Math.floor(1000 + Math.random() * 9000);
          // console.log(val);
          user.code = codes + '-' + this.CustomerId
      }
    },
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};