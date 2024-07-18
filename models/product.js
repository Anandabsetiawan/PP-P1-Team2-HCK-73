'use strict';
const {
  Model
} = require('sequelize');
const { Op } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
      Product.belongsToMany(models.Account, { through: models.AccountProduct })
      Product.hasMany(models.AccountProduct)
    }

    static async searchProduct(search) {
      try {
        let data
        if(search) {
          data = await Product.findAll({
            order: [
              ['productName']
            ],
            where: {
              productName: {
                [Op.iLike]: `%${search}%`
              }
            }
          })
        }
        else {
          data = await Product.findAll({
            order: [
              ['productName']
            ]
          })
        }
        return data
        
      } catch (error) {
        throw error
      }
    }

    static async dataQR(id) {
      try {
        let product = await Product.findByPk(id)
        let data = {
          name: product.productName,
          price: product.price
        }

        return data
        
      } catch (error) {
        throw error
      }
    }
  }
  Product.init({
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "product name is required"
        },
        notEmpty: {
          msg: "product name is required"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "description is required"
        },
        notEmpty: {
          msg: "description is required"
        },
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "imageURL is required"
        },
        notEmpty: {
          msg: "imageURL is required"
        },
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "stock is required"
        },
        notEmpty: {
          msg: "stock is required"
        },
        min: {
          args: [0],
          msg: "minimum stock is 0"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "price is required"
        },
        notEmpty: {
          msg: "price is required"
        },
        min: {
          args: [0],
          msg: "minimum price is 0"
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "category is required"
        },
        notEmpty: {
          msg: "category is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};