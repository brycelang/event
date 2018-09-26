require('dotenv').config(); // Enable access to .env variables

// Set up Express, middleware 
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require("http");
const app = express();
const request = require("request");
const rest = require("node-rest-client");
const signale = require("signale");

const db = require('./../db/config');
const PORT = process.env.PORT || 3000 || port;
const DB_NAME = process.env.DB_NAME;
app.use(bodyParser.json()); // Parse text as JSON, expose result object on req.body
app.use(express.static(path.join(__dirname, '../public/'))); // Serve up static files 

// connects to mysql database
db.dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected! to mysql");

});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/**
 * FUNCTION TO TURN OBJECTS INTO MAPS
 */
var Client = require('node-rest-client').Client;
 
var client = new Client();
const xah_obj_to_map = ( obj => {
  const mp = new Map;
  Object.keys ( obj ). forEach (k => { mp.set(k, obj[k]) });
  return mp;
});


/************************
 * NEED TO LOOP THROUGH THE EVENT OBJECT PULLING *
 * ALL LISTED EVENTS AND DISPAY A LIST OF THEM ON THE INDEX
 * 
 * */
// direct way
api = client.get("https://api.songkick.com/api/3.0/metro_areas/3733/calendar.json?apikey=6ZqAuOfV3FcTqwAU", function (data, response) {
  var results = data.resultsPage.results;
  /**
   *TURNS JSON OBJECT INTO A MAP
   */
  var listmap = (xah_obj_to_map ( results ) );
  // console.log (listmap);

  /***Object structure for listed events some of these are also objects */
  
  //results.event[x] {}
  // [0] objectKeys: [ 'id',
  // 19:56:53 web.1   |  [0]   'displayName',
  // 19:56:53 web.1   |  [0]   'type',
  // 19:56:53 web.1   |  [0]   'uri',
  // 19:56:53 web.1   |  [0]   'status',
  // 19:56:53 web.1   |  [0]   'popularity',
  // 19:56:53 web.1   |  [0]   'start',
  // 19:56:53 web.1   |  [0]   'performance',
  // 19:56:53 web.1   |  [0]   'ageRestriction',
  // 19:56:53 web.1   |  [0]   'flaggedAsEnded',
  // 19:56:53 web.1   |  [0]   'venue',
  // 19:56:53 web.1   |  [0]   'location' ]
  // }

  /**performance object keys */
  // objectKeys: [ 'id', 'displayName', 'billing', 'billingIndex', 'artist' ]
  /************** */

  var objectKeys = Object.keys(results.event[1].performance[1]);
  console.log("objectKeys:", objectKeys);

  /****
   *Saving data and Setting variables
   *****/
  // i is the index of the array static for now for testing purposes
  var i = 3;
  // conditionals
    var type = results.event[i].type;
    var isActive = results.event[i].flaggedAsEnded;
    var ageRestriction = results.event[i].ageRestriction;

// dynamic info for venues/concerts
    var displayName = results.event[i].displayName;
    var venueName = results.event[i].venue.displayName;
    var venueId = results.event[i].venue.id;
    var venueLocation = results.event[i].venue.metroArea.displayName;
    var venueUri = results.event[i].venue.uri;


    var uri = results.event[i].uri;
    var time =  results.event[i].start.time;
    var date = results.event[i].start.date;
    var performance = results.event[i].performance;
    var event = results.event;



  // pulls all event data from the SongKick API
  event.forEach(function (event) {
    name = event.displayName;
    id = event.id;
    isActive = event.flaggedAsEnded;
    ageRestricted = event.ageRestriction;

// BUILD AN ARRAY TO HOLD EVENT DATA FOR OUT DATABASE
    values = [];
    values.push(id, isActive, ageRestricted,  name);
    // console.log(values);
    /********
     * 
     * SCRIPT FOR INSERTING THE EVENT ARRAY INTO OUR DB
     */
      // var sql = "INSERT INTO events (id, isActive, ageRestricted, name) VALUES (?)";
    
      // db.dbConnection.query(sql, [values], function (err, result) {
      //   if (err) throw err;
      //   console.log("Number of records inserted: " + result.affectedRows);
      // });

        db.dbConnection.query("SELECT * FROM events", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });

});
    /*******
     * loop through the performance array to grab each artist name for the event
     */
    performance.forEach(function (artist) {
      artistName = artist.displayName;
      values = [];
      values.push(artistName);
      console.log("artists: " + values);
  });

//   if (ageRestriction != null ){   console.log("Age Restriction: " + ageRestriction);    }
//  console.log("Type: " + type);
//   if (isActive != null ){    console.log("Is Active: " + isActive);  }
//  console.log("Display Name:" + displayName);
//   if (time != null ){    console.log("Time: " + time);  }
//    console.log("Date: " + date);
//  console.log("Venue Name: " + venueName);
//  console.log("Venue Location: " + venueLocation);
//  console.log("Venue Id: " + venueId);
//  console.log("Venue Link: " + venueUri);
//  console.log("Event Link:" + uri);
//console.log(uri); 

    // parsed response body as js object
    // console.log(data);
    // raw response
    // console.log(response);
});
 

