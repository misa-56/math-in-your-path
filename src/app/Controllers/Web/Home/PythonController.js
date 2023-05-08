class PythonController {

    index(req, res) 
    {
        res.render('partials/user/main/python/python');
    }
}

module.exports = new PythonController;