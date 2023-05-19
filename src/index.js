const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
// body-parser middleware
const bodyParser = require('body-parser');
// import handlebars from 'express-handlebars';
const {engine} = handlebars;
//import bcrypt
// const bcrypt = require('bcrypt');

// const plainTextPassword = '123456';

// bcrypt.hash(plainTextPassword, 10)
//   .then(hash => {
//     console.log(hash); // Print the hashed password
//   })
//   .catch(error => {
//     console.error(error); // Handle error
//   });
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

// Set up session middleware
app.use(session({
  secret: 'math!ny0urpath',
  resave: false,
  saveUninitialized: false
}));


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