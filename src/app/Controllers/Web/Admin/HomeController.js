const { models: { User } } = require('../../../Models');

class HomeController {

    async index(req, res) 
    {
        try {
            const users = await User.findAll();
            let rows = users.map((row) => {
                return row.email;
            })
            // console.log('email', rows);
          } catch (error) {
            console.error(error);
          }

        res.render('partials/admin/main/home/home', { layout: 'admin.hbs' });
    }
}

module.exports = new HomeController;