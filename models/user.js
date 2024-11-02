const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productCreate: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  productRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  orderRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  orderCreate: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  cartRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  cartCreate: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

const UserRole = sequelize.define("userRole", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = {
  User,
  Role,
  UserRole,
};
