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
const eqHelper = require('./app/Helpers/helpers'); // Import the helper file

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

// Register the helper with Handlebars
handlebars.create({ helpers: { eq: eqHelper } });

//Template engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './src/resources/views');

//routes
app.use('/', home);
app.use('/kingslanding', admin, express.static('./src/public'));

//webhook
app.post('/webhook', (req, res) => {
  // Retrieve the payload data from the request body
  const payload = req.body;

  // Process the payload or perform any necessary actions
  // For example, you can log the payload data or trigger a deployment process
  console.log('Received webhook payload:', payload);

  // Send a response to acknowledge the webhook event
  res.status(200).send('Webhook received successfully');
});

app.listen(port, () => {});