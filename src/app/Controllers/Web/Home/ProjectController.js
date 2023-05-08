class ProjectController {

    index(req, res) 
    {
        res.render('partials/user/main/projects/projects');
    }
}

module.exports = new ProjectController;