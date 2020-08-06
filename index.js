const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const logger = require('./middleware/logger')
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express()

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views');    // this is default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(helmet());

app.use('/api/courses', courses);
app.use('/', home);

app.use(logger);
// Configuration
// console.log('Application Name:' + config.get('name'));
// console.log('Mail Server:' + config.get('mail.host'));

// if (app.get('env') === 'development') {
//     app.use(morgan('tiny'));
//     // console.log('Morgan enabled...');
//     startupDebugger('Morgan enabled...');
// }


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});