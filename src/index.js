import express from 'express';
import handlebars from 'express-handlebars';
const {engine} = handlebars;
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(express.static('./src/public'));
//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './src/resources/views');

app.get('/', (req, res) => {
  res.render('partials/user/main/home/home');
})
app.get('/statistics', (req, res) => {
  res.render('partials/user/main/statistics/statistics');
})
app.get('/machine-learning', (req, res) => {
  res.render('partials/user/main/machine-learning/machine-learning');
})
app.get('/python', (req, res) => {
  res.render('partials/user/main/python/python');
})
app.get('/projects', (req, res) => {
  res.render('partials/user/main/projects/projects');
})
//detail page
app.get('/category/details', (req, res) => {
  res.render('partials/user/main/machine-learning/details/details');
})


//admin page
app.get('/kingslanding', (req, res) => {
  res.render('partials/admin/main/home/home', {layout: 'admin.hbs'});
})
app.get('/kingslanding/statistics', (req, res) => {
  res.render('partials/admin/main/statistics/statistics', {layout: 'admin.hbs'});
})
app.get('/kingslanding/machine-learning', (req, res) => {
  res.render('partials/admin/main/machine-learning/machine-learning', {layout: 'admin.hbs'});
})
app.get('/kingslanding/python', (req, res) => {
  res.render('partials/admin/main/python/python', {layout: 'admin.hbs'});
})
app.get('/kingslanding/projects', (req, res) => {
  res.render('partials/admin/main/projects/projects', {layout: 'admin.hbs'});
})

//create page
app.get('/kingslanding/create', (req, res) => {
  res.render('partials/admin/main/create', {layout: 'admin.hbs'});
})
//edit page
app.get('/kingslanding/edit', (req, res) => {
  res.render('partials/admin/main/edit', {layout: 'admin.hbs'});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})