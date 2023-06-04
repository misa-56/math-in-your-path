const Article = require('../../../Models/Article');

class PythonController {

    async index(req, res) 
    {
        const articles = await Article.findAll({
            order:[['id', 'DESC']],
            where: {
                category: 'Python',
            }
        });
        console.log('articles', articles);

        // const articlesWithOwnProperties = articles.map(article => Object.assign({}, article.get({ plain: true })));

        const articlesWithOwnProperties = articles.map(article => {
            const plainArticle = article.get({ plain: true });
            // Convert the updatedAt property to an ISO date format
            plainArticle.updatedAt = plainArticle.updatedAt.toISOString().split('T')[0];
            return plainArticle;
          });

        res.render('partials/user/main/python/python', { articles: articlesWithOwnProperties });
    }
}

module.exports = new PythonController;