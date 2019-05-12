const Spotify = require('node-spotify-api');
require("dotenv").config();
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify)
const fs = require("fs")
const axios = require("axios")
const moment = require('moment');

const command = process.argv[2];

switch (command) {
    case "concert-this":
      console.log("concert-this");
      break;
    case "spotify-this-song":
      console.log("spotify-this-song");
      break;
    case "movie-this":
      console.log("movie-this");
      break;
    case "do-what-it-says":
      console.log("do-what-it-says");
  }