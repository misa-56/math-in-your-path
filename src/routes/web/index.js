const express = require('express');
const router = express.Router();
const homeController = require('../../app/Controllers/Web/Home/HomeController');
const statisticsController = require('../../app/Controllers/Web/Home/StatisticController');
const pythonController = require('../../app/Controllers/Web/Home/PythonController');
const machineLearningController = require('../../app/Controllers/Web/Home/MachineLearningController');
const projectController = require('../../app/Controllers/Web/Home/ProjectController');
const articleController = require('../../app/Controllers/Web/Home/ArticleController');

router.get('/', homeController.index );
router.get('/load-more', homeController.loadMore);
router.get('/statistics', statisticsController.index);
router.get('/machine-learning', machineLearningController.index);
router.get('/python', pythonController.index);
router.get('/projects', projectController.index);
//detail page
router.get('/posts/:slug/:id', articleController.show);
//searching
router.get('/search', articleController.search);  


module.exports = router;