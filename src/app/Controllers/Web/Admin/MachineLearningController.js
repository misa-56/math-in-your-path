class MachineLearning {

    index(req, res) 
    {
        res.render('partials/admin/main/machine-learning/machine-learning', {layout: 'admin.hbs'});
    }
}

module.exports = new MachineLearning;