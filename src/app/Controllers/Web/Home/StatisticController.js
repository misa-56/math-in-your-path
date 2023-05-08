class StatisticsController {

    index(req, res) 
    {
        res.render('partials/user/main/statistics/statistics');
    }
}

module.exports = new StatisticsController;