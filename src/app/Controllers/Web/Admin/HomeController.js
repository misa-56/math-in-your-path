class HomeController {

    index(req, res) 
    {
        res.render('partials/admin/main/home/home', {layout: 'admin.hbs'});
    }
}

module.exports = new HomeController;