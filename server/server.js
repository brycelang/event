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

app.use(bodyParser.json()); // Parse text as JSON, expose result object on req.body
app.use(express.static(path.join(__dirname, '../public/'))); // Serve up static files 

//connects to mysql database
// db.dbConnection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
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
  var i = 2;
    var displayName = results.event[i].displayName;
    var venueName = results.event[i].venue.metroArea.displayName;
    var uri = results.event[1].uri;
    var isActive = results.event[1].flaggedAsEnded;
    var type = results.event[1].type;
    var time =  results.event[1].start.time;
    var date = results.event[1].start.date;
    var ageRestriction = results.event[1].ageRestriction;
    var performance = results.event[2].performance;


    signale.note(displayName);
    signale.note(venueName);
    signale.note(type);
    signale.note(isActive);
    signale.note(time);
    signale.note(date);
    if (ageRestriction != null ){    signale.note(ageRestriction);    }
    signale.note(uri);
    // signale.note(uri);

    /*******
     * loop through the performance array to grab each artist name for the event
     */
    performance.forEach(function (artist) {
      var list = artist.displayName;
      signale.note(list);
  });

    // parsed response body as js object
    // console.log(data);
    // raw response
    // console.log(response);
});
 

  
//   // Object.keys(resp.resultsPage.results.event).map(e => {
//   //   console.log(`key= ${e} value = ${resp.resultsPage.results.event[e]}`);
//   //   // var objectEntries = entries(experienceObject);
//   //   // console.log("objectEntries:", objectEntries);
//   // });
