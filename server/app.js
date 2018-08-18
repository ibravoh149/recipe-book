import express from 'express';
import path from 'path';
import logger from 'morgan'
import cors from 'cors';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import passport from 'passport';
// import api from './routes/index';


const expressValidator = require('express-validator');

const app = express();

// import webpack from 'webpack';
// import webpackMiddleware from 'webpack-dev-middleware';
// import api from './routes/api';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(validator());

app.use(expressValidator({
    customValidators: {
       isArray: function(value) {
          return Array.isArray(value);
       },
       notEmptyArray: function(array) {
          return array.length > 0;
       },
       gte: function(param, num) {
          return param >= num;
       }
    }
  }));


app.use(passport.initialize());

// app.use('/api/v1/groove', api);

app.use('/', function(req, res){
    res.statusCode = 200;
    res.json({status:"success", message:"refer to the awesome groove API", data:{}})
});



//catch 404 and handle with error handler
app.use((req, res, next)=>{
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler
app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.Error = req.app.get('env') === 'development' ? err : {};

//display the error
    res.status(err.status || 500);
    res.send('error');
});





export default app;