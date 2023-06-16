const User = require('./User');
const Article = require('./Article');
// const sequelize = require('../../config/database');


async function connectDB() {

    await User.sync({
        alter: true
    });
    await Article.sync({ 
        // alter: true 
    });
}
  

module.exports = {connectDB};