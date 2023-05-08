const express = require('express');
const handlebars = require('express-handlebars');
// import handlebars from 'express-handlebars';
const {engine} = handlebars;
// import morgan from 'morgan';
const morgan = require('morgan');
//import db
const db = require('./app/Models');
const connection = require('./config/db-config');
// import routes
const home = require('./routes/web');
const admin = require('./routes/web/kingslanding');


const app = express();
const port = 3000; 

app.use(express.static('./src/public'));
//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './src/resources/views');

(async () =>{
  await db.sequelize.sync();
})();

//routes
app.use('/', home),
app.use('/kingslanding', admin, express.static('./src/public')),

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})