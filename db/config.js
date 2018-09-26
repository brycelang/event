const mysql = require('mysql');
var db = "event_db";

exports.dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "event_db"
});

