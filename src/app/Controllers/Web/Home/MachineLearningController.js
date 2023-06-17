const Article = require('../../../Models/Article');

class MachineLearningController {

    async index(req, res) 
    {
        const articles = await Article.findAll({
            order:[['id', 'DESC']],
            where: {
                category: 'Machine Learning',
            }
        });
        console.log('articles', articles);

        // const articlesWithOwnProperties = articles.map(article => Object.assign({}, article.get({ plain: true })));

        const articlesWithOwnProperties = articles.map(article => {
            const plainArticle = article.get({ plain: true });
            // Convert the updatedAt property to an ISO date format
            plainArticle.createdAt = plainArticle.createdAt.toISOString().split('T')[0];
            return {...plainArticle, slug: article.title.replace(/ /g, '-'),};
          });

        res.render('partials/user/main/machine-learning/machine-learning', { articles: articlesWithOwnProperties, activePage: 'Machine Learning' });
    }
}

module.exports = new MachineLearningController;