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
  res.render('home');
})
app.get('/statistics', (req, res) => {
  res.render('statistics');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})