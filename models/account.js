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

    get accDetails() {
      return `${this.name} - ${this.address} - ${this.phoneNumber}`
    }
  }
  Account.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "username is required"
        },
        notEmpty: {
          msg: "username is required"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "address is required"
        },
        notEmpty: {
          msg: "address is required"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "phone number is required"
        },
        notEmpty: {
          msg: "phone number is required"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "role is required"
        },
        notEmpty: {
          msg: "role is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};