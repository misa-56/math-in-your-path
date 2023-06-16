const User = require('./User');
const Article = require('./Article');
// const sequelize = require('../../config/database');


async function connectDB() {

    await User.sync({
        alter: true
    }).catch((error) => {
        console.error('Error occurred during database synchronization:', error);
        // Handle the error appropriately (e.g., log, throw, exit the process)
    });

    await Article.sync({ 
        // alter: true 
    });
}
  
module.exports = {connectDB};