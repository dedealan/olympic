const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const winnersRouter = require('./routes/winners');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api/winners', winnersRouter);


module.exports = app;