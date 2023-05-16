const Article = require('../../../Models/Article');

class HomeController {

    async index(req, res) 
    {
        const limit = 2; // Number of articles per page
        const offset = parseInt(req.query.offset) || 0; // Start offset
        const articles = await Article.findAll({
            limit,
            offset,
            order:[['createdAt', 'DESC']],
        });
        console.log('articles', articles);

        const featuredArticles = await Article.findAll({
            raw: true,
            order:[['createdAt', 'DESC']],
            limit: 3,
        });
        const modifiedFeaturedArticles = featuredArticles.map(article => {
            return {
              ...article,
              slug: article.title.replace(/ /g, '-'),
              // Add more custom fields as needed
            };
        });
        // featuredArticles.createdAt = featuredArticles.createdAt.toISOString().split('T')[0];
        console.log(modifiedFeaturedArticles[0]);

        // const articlesWithOwnProperties = articles.map(article => Object.assign({}, article.get({ plain: true })));

        const articlesWithOwnProperties = articles.map(article => {
            const plainArticle = article.get({ plain: true });
            // Convert the updatedAt property to an ISO date format
            plainArticle.slug = plainArticle.title.replace(/ /g, '-');
            // console.log('slug', plainArticle.slug);
            plainArticle.updatedAt = plainArticle.updatedAt.toISOString().split('T')[0];
            return plainArticle;
          });

          res.render('partials/user/main/home/home', 
          { articles: articlesWithOwnProperties, 
            featured: modifiedFeaturedArticles.slice(1, 3), 
            newestFeatured: modifiedFeaturedArticles[0] });
    }
}

module.exports = new HomeController;