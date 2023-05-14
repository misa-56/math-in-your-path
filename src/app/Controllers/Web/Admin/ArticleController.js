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
    if(req.body.category && req.body.status && req.body.title) {
      const { category, status, title } = req.body;
      
      await Article.create({ 
        category, 
        status, 
        title,
      });

      res.redirect('/kingslanding');

    }
    else{
      res.send('Not added to db');
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