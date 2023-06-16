const express = require('express');
const router = express.Router();
const homeController = require('../../app/Controllers/Web/Admin/HomeController');
const statisticsController = require('../../app/Controllers/Web/Admin/StatisticController');
const pythonController = require('../../app/Controllers/Web/Admin/PythonController');
const machineLearningController = require('../../app/Controllers/Web/Admin/MachineLearningController');
const projectController = require('../../app/Controllers/Web/Admin/ProjectController');
const userController = require('../../app/Controllers/Web/Admin/UserController');
const articleController = require('../../app/Controllers/Web/Admin/ArticleController');

const isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated
  // For example, check if the user session exists
  // If the user is not authenticated, you can redirect them to the login page or send an error response
  if (!req.session.user) {
    res.redirect('/kingslanding/login');
    return;
  }
    // Pass the user object to res.locals
    res.locals.user = req.session.user;
  // If the user is authenticated, continue to the next middleware or route handler
  next();
};

// Login routes accessible without authentication
router.get('/login', userController.index);
router.post('/login', userController.login);

// Apply the isAuthenticated middleware to all routes that come after it
router.use(isAuthenticated);

// Routes accessible only when the user is authenticated
//admin profile
router.get('/profile', userController.profile);
router.post('/profile/update', userController.updateProfile)

//Home Page
router.get('/', homeController.index);
//Statistics Page
router.get('/statistics', statisticsController.index);
//Machine Learning Page
router.get('/machine-learning', machineLearningController.index);
//Python Page
router.get('/python', pythonController.index);
//Project Page
router.get('/projects', projectController.index);

//create page
router.get('/articles/create', articleController.create);
router.post('/articles/create', articleController.store);
//edit page
router.get('/edit/:id', articleController.edit);
router.post('/update/:id', articleController.update);


module.exports = router;