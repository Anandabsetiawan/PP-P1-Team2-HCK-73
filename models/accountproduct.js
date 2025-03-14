'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AccountProduct.belongsTo(models.Product, { foreignKey: "ProductId" })
      AccountProduct.belongsTo(models.Account, { foreignKey:"AccountId"})
    }
  }
  AccountProduct.init({
    AccountId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AccountProduct',
  });
  return AccountProduct;
};