class HomeController {

    index(req, res) 
    {
        res.render('partials/user/main/home/home');
    }
}

module.exports = new HomeController;