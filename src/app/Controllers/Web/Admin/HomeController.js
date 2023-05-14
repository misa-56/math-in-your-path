const User = require('../../../Models/User');

class HomeController {

  async index (req, res)
    {
      try{
        const users = await User.findAll();
        // console.log(users[0].name);
        res.render('partials/admin/main/home/home', { layout: 'admin.hbs' });
      }
      catch (error){
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }
}

module.exports = new HomeController;