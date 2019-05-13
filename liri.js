const Spotify = require("node-spotify-api");
require("dotenv").config();
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const fs = require("fs");
const axios = require("axios");
const moment = require("moment");

const command = process.argv[2];
const userInput = process.argv.slice(3).join(" ");

switch (command) {
  case "concert-this":
    axios
      .get(
        "https://rest.bandsintown.com/artists/" +
          userInput +
          "/events?app_id=codingbootcamp"
      )
      .then(function(response) {
        const eventArray = response.data;
        eventArray.forEach(function(response) {
          console.log(response.venue.name);
          console.log(`${response.venue.city}, ${response.venue.region}`);
          console.log(moment(response.datetime).format("MM/DD/YYYY"));
          console.log("==============================================");
        });
      });
    break;
  case "spotify-this-song":
    spotify.search({ type: 'track', query: `'${userInput}'`, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log(`Artist: ${data.tracks.items[0].album.artists[0].name}`);
      console.log(`Song: ${data.tracks.items[0].name}`)
      const previewURL = data.tracks.items[0].preview_url
      console.log(previewURL === null? "Preview not available for this song" : `Preview: ${previewURL}`)
      console.log(`Album: ${data.tracks.items[0].album.name}`)
      });
    break;
  case "movie-this":
    axios
      .get(
        "http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy"
      )
      .then(function(response) {
        // Then we print out the imdbRating
        console.log("The movie's rating is: " + response.data.imdbRating);
      });
    break;
  case "do-what-it-says":
    console.log("do-what-it-says");
}