
const express = require('express');
const router = express.Router();
const homeController = require('../../app/Controllers/Web/Admin/HomeController');
const statisticsController = require('../../app/Controllers/Web/Admin/StatisticController');
const pythonController = require('../../app/Controllers/Web/Admin/PythonController');
const machineLearningController = require('../../app/Controllers/Web/Admin/MachineLearningController');
const projectController = require('../../app/Controllers/Web/Admin/ProjectController');
const userController = require('../../app/Controllers/Web/Admin/UserController');


//Home Page
router.get('/', homeController.index);
//Login Page
router.get('/login', userController.index);
//Statistics Page
router.get('/statistics', statisticsController.index);
//Machine Learning Page
router.get('/machine-learning', machineLearningController.index);
//Python Page
router.get('/python', pythonController.index);
//Project Page
router.get('/projects', projectController.index)

//create page
router.get('/create', (req, res) => {
    res.render('partials/admin/main/create', {layout: 'admin.hbs'});
})
//edit page
router.get('/edit', (req, res) => {
    res.render('partials/admin/main/edit', {layout: 'admin.hbs'});
})

module.exports = router