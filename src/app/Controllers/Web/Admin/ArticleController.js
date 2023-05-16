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
    console.log(req.body);
    try{
      if(req.body.category && req.body.status && req.body.title) {
        const { category, status, title, content, intro, featured } = req.body;
        
        await Article.create({ 
          category, 
          status, 
          title,
          content,
          intro,
          featured,
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

  edit (req, res)
  {
    res.render('partials/admin/main/articles/edit', {layout: 'admin.hbs'});
  }

  update ()
  {
    
  }
}

module.exports = new ArticleController;