const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  intro: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize, // pass the connection instance
  tableName: 'users', // choose the model name
  paranoid: true, // use soft delete
});

module.exports = User;
