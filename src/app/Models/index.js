const User = require('./User');
const Article = require('./Article');
// const sequelize = require('../../config/database');


async function connectDB() {

    await User.sync();
    console.log("The table for the User model was just (re)created!");
    await Article.sync();
    console.log("The table for the Article model was just (re)created!");
}
  

module.exports = {connectDB};