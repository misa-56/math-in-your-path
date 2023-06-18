const Article = require('../../../Models/Article');
const User = require('../../../Models/User');

class ArticleController {

    async show(req, res) 
    {
        try{
            const articles = await Article.findOne({where: {id: req.params.id}});
            const latestArticles = await Article.findAll({
                where: {category: articles.category},
                limit: 3,
            });
            console.log(latestArticles.dataValues);
            let user = 0;
            if (articles.dataValues.user_id) {
                user = await User.findOne({where: {id: articles.dataValues.user_id}});
            }
            // console.log(user.dataValues);
            if (articles === null) {
                // Handle the case when no article is found
                return res.status(404).send('Article not found');
            }
            const latestArticleData = latestArticles.map((article) => ({
                ...article.dataValues,
                createdAt: article.dataValues.createdAt.toISOString().split('T')[0],
                slug: article.title.replace(/ /g, '-'),
            }));
            articles.dataValues.createdAt = articles.dataValues.createdAt.toISOString().split('T')[0];
            // console.log('articles', articles);

            res.render('partials/user/main/articles/details', { 
                article: articles.dataValues, 
                user: user.dataValues, 
                activePage: articles.dataValues.category,
                latestArticles: latestArticleData
            });
        }
        catch (error) {
            // Handle any potential errors
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new ArticleController;