const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const methods = require('methods');
const methodOverride = require('method-override');
const passport = require('passport');


const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());

/** error handling middleware functions for dev and for prod */
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = '404';
  next(error);
});

// development error handler, prints stacktrace
if(!isProduction){
  app.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler, does not print stacktrace
app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.set('port', process.env.PORT || 6000);
const server = app.listen(app.get('port'), ()=> {
  console.log('Server started...\nListening on port: ' + server.address().port);
});