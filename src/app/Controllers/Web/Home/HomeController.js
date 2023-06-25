const Article = require('../../../Models/Article');

class HomeController {

    async index(req, res) 
    {
        // const limit = 2; // Number of articles per page
        // const offset = req.query.page ? (req.query.page - 1) * limit : 0;
        const articles = await Article.findAll({
            raw: true,
            limit: 15,
            // offset,
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
              categorySlug: article.category.replace(/ /g, '-'),
              // Add more custom fields as needed
            };
        });

        const articlesWithOwnProperties = articles.map(article => {
            article.slug = article.title.replace(/ /g, '-');
            article.categorySlug = article.category.replace(/ /g, '-'),
            article.createdAt = article.createdAt.toISOString().split('T')[0];
            return article;
          });

        res.render('partials/user/main/home/home',
        {
            articles: articlesWithOwnProperties, 
            featured: modifiedFeaturedArticles.slice(1, 4), 
            newestFeatured: modifiedFeaturedArticles[0],
            activePage: 'home',
            title: 'MIYP - Math in your career path',
            description: 'Exploring the realm of data analysis and code, we aim to share knowledge and insights to inspire and empower.'
        });
    }

    async loadMore(req, res)
    {
        const { offset } = req.query;
        const articles = await Article.findAll({
            raw: true,
            limit: 10,
            offset: parseInt(offset),
            order:[['createdAt', 'DESC']],
          });

        res.json({ articles });
    }
}

module.exports = new HomeController;