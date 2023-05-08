class ProjectController {

    index(req, res) 
    {
        res.render('partials/admin/main/projects/projects', {layout: 'admin.hbs'});
    }
}

module.exports = new ProjectController;