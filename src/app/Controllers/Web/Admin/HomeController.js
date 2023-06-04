const User = require('../../../Models/User');

class HomeController {

  async index (req, res)
    {
      try{
        const user = req.session.user;
        res.render('partials/admin/main/home/home', { layout: 'admin.hbs', user });
      }
      catch (error){
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }
}

module.exports = new HomeController;