const Article = require('../../../Models/Article');

class HomeController {

    async index(req, res) 
    {
        const articles = await Article.findAll({
            order:[['createdAt', 'DESC']],
            limit: 20,
        });
        console.log('articles', articles);

        // const articlesWithOwnProperties = articles.map(article => Object.assign({}, article.get({ plain: true })));

        const articlesWithOwnProperties = articles.map(article => {
            const plainArticle = article.get({ plain: true });
            // Convert the updatedAt property to an ISO date format
            plainArticle.slug = plainArticle.title.replace(/ /g, '-');
            // console.log('slug', plainArticle.slug);
            plainArticle.updatedAt = plainArticle.updatedAt.toISOString().split('T')[0];
            return plainArticle;
          });

          res.render('partials/user/main/home/home', { articles: articlesWithOwnProperties });
    }
}

module.exports = new HomeController;