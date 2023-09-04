const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const session = require('express-session');

const app = express();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:7000'
 }));
 app.use(bodyParser.json());
 app.use(express.urlencoded({
    extended: false
 }))
 app.use(bodyParser.urlencoded({
    extended: true
 }))
 app.use((error, req, res, next) => {
   res.status(500).json({ error: error.message });
 });
 
 app.use(session({
   secret: process.env.SESSION_kEY,
   resave: false,
   saveUninitialized: false,
   cookie: { maxAge: 60000 * 60 * 24}
}));


 app.get('/', (req, res) => {
    return res.status(200).json({
        Message: 'Home page'
    });
 });

 app.use('/v1', api);


 module.exports = app;