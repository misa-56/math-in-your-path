const Article = require('../../../Models/Article');

class ArticleController {

  async create (req, res)
  {
    try{
      res.render('partials/admin/main/create', {layout: 'admin.hbs'});
    }
    catch (error){
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  store (req, res)
  {
    
  }
}

module.exports = new ArticleController;