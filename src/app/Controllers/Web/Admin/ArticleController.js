const Article = require('../../../Models/Article');

class ArticleController {

  async create (req, res)
  {
    try{
      res.render('partials/admin/main/articles/create', {layout: 'admin.hbs'});
    }
    catch (error){
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async store (req, res)
  {
    
    try{
      if(req.body.category && req.body.status && req.body.title) {
        const { category, status, title, content, intro, featured, bg_image } = req.body;
        
        await Article.create({ 
          category, 
          status, 
          title,
          content,
          intro,
          featured,
          bg_image
        });

        res.redirect('/kingslanding');

      }
      else{
        res.send('Not added to db');
      }
    }
    catch(error){
      console.error(error);
    }
  }

  async edit (req, res)
  {
    let categories;
    try {
      const articles = await Article.findOne({where: {id: req.params.id}});
      await Article.findAll({group: ['category'], 
      attributes: ['category'],
    })
      .then((results) => {
        categories = results.map((result) => result.category);
        console.log('categories', categories);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(categories);
      if (articles === null) {
        // Handle the case when no article is found
        return res.status(404).send('Article not found');
      }
      articles.dataValues.createdAt = articles.dataValues.createdAt.toISOString().split('T')[0];

      res.render('partials/admin/main/articles/edit', {layout: 'admin.hbs', article: articles.dataValues, categories });
    } catch (error) {
      console.error(error);
    }
  }

  async update (req, res)
  {
    console.log('abc', req.params.id);
    try {
      const article = await Article.findByPk(req.params.id);
      await article.update(req.body);
      res.redirect('/kingslanding');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new ArticleController;