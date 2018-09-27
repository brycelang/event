const mysql = require('mysql');
var db = "event_db";

exports.dbConnection = mysql.createConnection({
  host: "events.crkn8bslxfrr.us-east-1.rds.amazonaws.com",
  user: "brycelang",
  password: "Brycelogan99",
  database: "event_db"
});

