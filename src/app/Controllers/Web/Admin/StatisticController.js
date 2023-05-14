const Article = require('../../../Models/Article');

class StatisticsController {

    async index(req, res) 
    {
        const articles = await Article.findAll();
        console.log(articles);

        res.render('partials/admin/main/statistics/statistics', {layout: 'admin.hbs', articles: articles});
    }
}

module.exports = new StatisticsController;