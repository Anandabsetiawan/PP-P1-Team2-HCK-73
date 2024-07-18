'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User, { foreignKey: "UserId" })
      Account.belongsToMany(models.Product, { through: models.AccountProduct })
      Account.hasMany(models.AccountProduct, { foreignKey:"AccountId"})
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
  //   Account.addHook('beforeCreate', (account, Option) =>{
  //     const salt = bcrypt.genSaltSync(10);
  //     const hash = bcrypt.hashSync("account.accountPassword", salt);

  //     account.accountPassword = hash
  // })
  return Account;
};