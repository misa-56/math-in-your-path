const User = require('../../../Models/User');

class HomeController {

  async index (req, res)
    {
      try{
        const users = await User.findAll();
        res.render('partials/admin/main/home/home', { layout: 'admin.hbs', username: users[0].name });
      }
      catch (error){
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }
}

module.exports = new HomeController;