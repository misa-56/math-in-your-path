const express = require('express');
const router = express.Router();
const homeController = require('../../app/Controllers/Web/Home/HomeController');
const statisticsController = require('../../app/Controllers/Web/Home/StatisticController');
const pythonController = require('../../app/Controllers/Web/Home/PythonController');
const machineLearningController = require('../../app/Controllers/Web/Home/MachineLearningController');
const projectController = require('../../app/Controllers/Web/Home/ProjectController');

router.get('/', homeController.index );
router.get('/statistics', statisticsController.index);
router.get('/machine-learning', machineLearningController.index);
router.get('/python', pythonController.index);
router.get('/projects', projectController.index);
//detail page
router.get('/category/details', (req, res) => {
res.render('partials/user/main/machine-learning/details/details');
})
//searching
router.get('/search', (req, res) => {
res.render('partials/user/main/search/search');
})  

module.exports = router;