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

async function saveUser() {
  const nhat = User.build({ email: 'nhat9565@gmail.com', name: 'Misha', password: '$2b$10$F5kZE1EmEgP2RYd0d9h5aO.mbTZDoegVJX/OFAiQHbYFJ01lDcFMq' });
  await nhat.save();
  console.log('Misha was saved to the database!');  
}

saveUser(); // Call the async function to save the user

module.exports = User;
