'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" })
      Product.belongsToMany(models.Account, { through: models.AccountProduct })
      Product.hasMany(models.AccountProduct, { foreignKey:"ProductId"})
    }
  }
  Product.init({
    productName: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageURL: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};