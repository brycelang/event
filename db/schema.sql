/* placeholder sample table */

drop database if exists app_db;

CREATE DATABASE IF NOT EXISTS app_db;

 USE app_db;

 CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255),
  password VARCHAR(255),
  PRIMARY KEY(id)
 );