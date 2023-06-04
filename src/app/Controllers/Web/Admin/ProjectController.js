const Article = require('../../../Models/Article');

class ProjectController {

    async index(req, res) 
    {
        const articles = await Article.findAll({
            order:[['id', 'DESC']],
            where: {
                category: 'Projects',
            }
        });
        console.log('articles', articles);

        const articlesWithOwnProperties = articles.map(article => {
            const plainArticle = article.get({ plain: true });
            // Convert the updatedAt property to an ISO date format
            plainArticle.updatedAt = plainArticle.updatedAt.toISOString().split('T')[0];
            return plainArticle;
          });
      
        res.render('partials/admin/main/projects/projects', { layout: 'admin', articles: articlesWithOwnProperties });
    }
}

module.exports = new ProjectController;