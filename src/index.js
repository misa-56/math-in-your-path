const express = require('express');
const handlebars = require('express-handlebars');
// body-parser middleware
const bodyParser = require('body-parser');
// import handlebars from 'express-handlebars';
const {engine} = handlebars;
// import morgan from 'morgan';
const morgan = require('morgan');
//import .env
require('dotenv').config();
//import db
const db = require('./app/Models');
db.connectDB();

// import routes
const home = require('./routes/web');
const admin = require('./routes/web/kingslanding');


const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
const port = process.env.PORT || 3000; 

app.use(express.static('./src/public'));
//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './src/resources/views');

//routes
app.use('/', home);
app.use('/kingslanding', admin, express.static('./src/public'));

app.listen(port, () => {});