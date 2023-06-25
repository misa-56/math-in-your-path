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
            plainArticle.createdAt = plainArticle.createdAt.toISOString().split('T')[0];
            return {...plainArticle, slug: article.title.replace(/ /g, '-'),};
          });

        res.render('partials/user/main/python/python', { 
            articles: articlesWithOwnProperties, 
            activePage: 'Python',
            title: 'Python',
            description: 'Harness Python for data analysis and automation. Learn how to manipulate and analyze data effectively using Python libraries and frameworks.'
          });
    }
}

module.exports = new PythonController;