require('dotenv').config;
const mssql = require('mssql');
let db;

console.log("ENTERS");
try {
  db = mssql.connect(process.env.DATABASE_CONNECTION_STRING);
  console.log("CONNECTED");
}catch(err) {
  console.log(err);
}
const {
  DATABASE_CONNECTION_STRING
} = process.env;


module.exports = {
  db,
};
