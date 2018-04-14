const DB_URL = process.env.NODE_ENV === 'production' ? '' : 'mongodb://localhost/Loc8r-react';
const SECRET = 'jwtsecret';

module.exports = {DB_URL, SECRET}