const Article = require('../../../Models/Article');

class StatisticsController {

    async index(req, res) 
    {
        const articles = await Article.findAll({
            order:[['id', 'DESC']],
            where: {
                category: 'Statistics',
            }
        });
        // console.log('articles', articles);

        // const articlesWithOwnProperties = articles.map(article => Object.assign({}, article.get({ plain: true })));

        const articlesWithOwnProperties = articles.map(article => {
            const plainArticle = article.get({ plain: true });
            // Convert the updatedAt property to an ISO date format
            plainArticle.createdAt = plainArticle.createdAt.toISOString().split('T')[0];
            return {...plainArticle, slug: article.title.replace(/ /g, '-'),};
          });

        res.render('partials/user/main/statistics/statistics', { 
            articles: articlesWithOwnProperties, 
            activePage: 'Statistics',
            title: 'Statistics',
            description: 'Uncover the power of statistics in data analysis. Explore concepts, methods, and applications for deriving meaningful insights and making informed decisions.'
        });
    }
}

module.exports = new StatisticsController;