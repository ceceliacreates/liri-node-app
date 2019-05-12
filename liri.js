const Spotify = require('node-spotify-api');
require("dotenv").config();
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify)
const fs = require("fs")
const axios = require("axios")
const moment = require('moment');

const command = process.argv[2];
const userInput = process.argv.slice(3).join(" ");

switch (command) {
    case "concert-this":
      console.log("concert-this");
      axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function(response) {
    const eventArray = response.data;
    eventArray.forEach(function(response) {
        console.log(response.venue.name)
        console.log(`${response.venue.city}, ${response.venue.region}`)
        console.log(moment(response.datetime).format("MM/DD/YYYY"))
        console.log("==============================================")
    })
  })
   break;
    case "spotify-this-song":
      console.log("spotify-this-song");
      break;
    case "movie-this":
    axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
        function(response) {
          // Then we print out the imdbRating
          console.log("The movie's rating is: " + response.data.imdbRating);
        })
      break;
    case "do-what-it-says":
      console.log("do-what-it-says");
  }
// for an artist and render the following information about each event to the terminal:

//      * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")
