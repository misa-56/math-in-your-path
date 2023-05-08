class StatisticsController {

    index(req, res) 
    {
        res.render('partials/admin/main/statistics/statistics', {layout: 'admin.hbs'});
    }
}

module.exports = new StatisticsController;