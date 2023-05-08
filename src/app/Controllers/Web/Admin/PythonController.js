class PythonController {

    index(req, res) 
    {
        res.render('partials/admin/main/python/python', {layout: 'admin.hbs'});
    }
}

module.exports = new PythonController;