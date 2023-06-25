const Article = require('../../../Models/Article');

class ProjectsController {

    async index(req, res) 
    {
        const articles = await Article.findAll({
            order:[['id', 'DESC']],
            where: {
                category: 'Projects',
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

        res.render('partials/user/main/projects/projects', { 
            articles: articlesWithOwnProperties, 
            activePage: 'Projects',
            title: 'Projects',
            description: 'Explore our data analysis projects. Gain inspiration, methodologies, and insights into solving data-related challenges.'
         });
    }
}

module.exports = new ProjectsController;