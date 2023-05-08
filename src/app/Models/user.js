// const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users',
    {
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        password: DataTypes.STRING,
    },
    {
        freezeTableName: true,
    });

    return User;
} 