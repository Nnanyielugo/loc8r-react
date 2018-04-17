const mongoose = require('mongoose');

const URI = require('../config/config').DB_URL;

mongoose.connect(URI);
if(process.env.NODE_ENV !== 'test'){
  mongoose.set('debug', true);
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to:', URI);
});

mongoose.connection.on('error', error => {
  console.log('Mongoose connection error:', error);
});

mongoose.connection.on('disconnected', ()=> {
  console.log('Mongoose disconnected from:', URI)
});

require('./models/');