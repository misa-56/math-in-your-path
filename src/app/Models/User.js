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
}, {
  sequelize, // pass the connection instance
  tableName: 'users', // choose the model name
  paranoid: true, // use soft delete
});

module.exports = User;
