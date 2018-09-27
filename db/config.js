const mysql = require('mysql');
var db = "event_db";

exports.dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "event_db"
});

