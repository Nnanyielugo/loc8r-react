const mongoose = require('mongoose');
let config = require('../config/config');

before(function(done){
  
  mongoose.connect(config.DB_URL);
  const db = mongoose.connection;

  db.on('error', function(err){
    console.log('Error connecting to', config.DB_URL + ': ' + err)
  })
  db.on('connected', function(){
    console.log('Mongoose connected to', config.DB_URL)
    done()
  })
  db.on('open', function(){
    db.dropDatabase(function(err, result){
      if(err){
        console.log(err)
      }
    })
  })
})