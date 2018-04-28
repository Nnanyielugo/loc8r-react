let DB_URL;
if(process.env.NODE_ENV === 'production'){
  DB_URL = "mongodb://nnanyielugo:Facidoxx@ds161539.mlab.com:61539/loc8r-react"
} else if (process.env.NODE_ENV === 'test') {
  DB_URL = 'mongodb://localhost/loc8r-test'
} else {
  DB_URL = 'mongodb://localhost/Loc8r-react'
 };
const SECRET = 'jwtsecret';

module.exports = {DB_URL, SECRET}