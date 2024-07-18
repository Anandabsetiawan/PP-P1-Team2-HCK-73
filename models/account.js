'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User)
      Account.belongsToMany(models.Product, { through: models.AccountProduct })
      Account.hasMany(models.AccountProduct)
    }
  }
  Account.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};