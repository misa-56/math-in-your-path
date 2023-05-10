const connection = require('../../../../config/database');
class HomeController {

  async index (req, res)
    {
      let [results, fields] = await connection.promise().query('SELECT * FROM Users');
      return res.render('partials/admin/main/home/home', { layout: 'admin.hbs', user: results[0] });
    }
}

module.exports = new HomeController;