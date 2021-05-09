const express = require('express');
const log = require('morgan');


const authorizationRoutes = require('./routes/authorization');
const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/note');
const aboutRoutes = require('./routes/about');

const app = express();

app.use(log('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', [authorizationRoutes, userRoutes, noteRoutes, aboutRoutes]);

module.exports = app;