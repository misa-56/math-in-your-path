const Article = require('../../../Models/Article');

class HomeController {

    async index(req, res) 
    {
        // const limit = 2; // Number of articles per page
        // const offset = req.query.page ? (req.query.page - 1) * limit : 0;
        const articles = await Article.findAll({
            raw: true,
            limit: 20,
            offset,
            order:[['createdAt', 'DESC']],
        });

        const featuredArticles = await Article.findAll({
            raw: true,
            order:[['createdAt', 'DESC']],
            limit: 4,
        });
        const modifiedFeaturedArticles = featuredArticles.map(article => {
            return {
              ...article,
              slug: article.title.replace(/ /g, '-'),
              // Add more custom fields as needed
            };
        });

        const articlesWithOwnProperties = articles.map(article => {
            article.slug = article.title.replace(/ /g, '-');
            article.updatedAt = article.updatedAt.toISOString().split('T')[0];
            return article;
          });

        res.render('partials/user/main/home/home',
        {
            articles: articlesWithOwnProperties, 
            featured: modifiedFeaturedArticles.slice(1, 4), 
            newestFeatured: modifiedFeaturedArticles[0] 
        });
    }
}

module.exports = new HomeController;