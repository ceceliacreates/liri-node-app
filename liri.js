const Spotify = require("node-spotify-api");
require("dotenv").config();
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const fs = require("fs");
const axios = require("axios");
const moment = require("moment");

const command = process.argv[2];
const userInput = process.argv.slice(3).join("+");

const processCommand = function(command, userInput) {
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
            const formattedDate = moment(response.datetime).format(
              "MM/DD/YYYY"
            );
            console.log(`${response.venue.name}
${response.venue.city}, ${response.venue.region}
${formattedDate}
==============================================`);
            fs.appendFile(
              "./log.txt",
              `
${response.venue.name}
${response.venue.city}, ${response.venue.region}
${formattedDate}
==============================================`,
              err => {
                if (err) console.log(`Could not log due to ${err.message}`);
              }
            );
          });
        });
      break;
    case "spotify-this-song":
      if (userInput === "") {
        userInput = "The Sign Ace of Base";
      }
      spotify.search(
        { type: "track", query: `'${userInput}'`, limit: 1 },
        function(err, data) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          console.log(`Artist: ${data.tracks.items[0].album.artists[0].name}
Song: ${data.tracks.items[0].name}`);
          fs.appendFile(
            "./log.txt",
            `
Artist: ${data.tracks.items[0].album.artists[0].name}
Song: ${data.tracks.items[0].name}`,
            err => {
              if (err) console.log(`Could not log due to ${err.message}`);
            }
          );
          const previewURL = data.tracks.items[0].preview_url;
          console.log(
            previewURL === null
              ? "Preview not available for this song"
              : `Preview: ${previewURL}`
          );
          fs.appendFile(
            "./log.txt",
            previewURL === null
              ? "\nPreview not available for this song"
              : `
Preview: ${previewURL}`,
            err => {
              if (err) console.log(`Could not log due to ${err.message}`);
            }
          );
          console.log(`Album: ${data.tracks.items[0].album.name}`);
          fs.appendFile("./log.txt", `
Album: ${data.tracks.items[0].album.name}
`, (err) => {if (err) console.log(`Could not log due to ${err.message}`);})
        }
      );
      break;
    case "movie-this":
      if (userInput === "") {
        userInput = "Mr Nobody";
      }
      axios
        .get(
          "http://www.omdbapi.com/?t=" +
            userInput +
            "&y=&plot=short&apikey=trilogy"
        )
        .then(function(response) {
          console.log(`Title: ${response.data.Title}
Release Year: ${response.data.Year}
IMDB Rating: ${response.data.imdbRating}
Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
Country: ${response.data.Country}
Language: ${response.data.Language}
Plot: ${response.data.Plot}
Actors: ${response.data.Actors}`);
fs.appendFile("./log.txt", `
Title: ${response.data.Title}
Release Year: ${response.data.Year}
IMDB Rating: ${response.data.imdbRating}
Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
Country: ${response.data.Country}
Language: ${response.data.Language}
Plot: ${response.data.Plot}
Actors: ${response.data.Actors}`, (err) => {if (err) console.log(`Could not log due to ${err.message}`);})
        });
      break;
    case "do-what-it-says":
      console.log("do-what-it-says");
      fs.readFile("./random.txt", "utf8", function(err, data) {
        if (err) console.log(err.message);
        const newArr = data.split(",");
        const command = newArr[0];
        const userInput = newArr[1];
        processCommand(command, userInput);
      });
  }
};

processCommand(command, userInput);
