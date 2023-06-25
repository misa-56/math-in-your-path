const express = require('express');
const session = require('express-session');
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
const eqHelper = require('./app/Helpers/helpers'); // Import the helper file

db.connectDB();
// Load Socket.IO controller
const BitcoinTrackerController = require('./app/Controllers/Web/Home/Projects/BitcoinTrackerController');

// import routes
const home = require('./routes/web');
const admin = require('./routes/web/kingslanding');


const app = express();

//import socket io
const http = require('http').Server(app);
const io = require('socket.io')(http);

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

http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

io.on('connection', BitcoinTrackerController.handleSocketConnection);
