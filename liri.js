require("dotenv").config();
var request = require("request");
var moment = require('moment');
var keys = require("./keys");
var Spotify = require('node-spotify-api');


// Naming this operator since this is basically a calculator app.
var operator = process.argv[2];

// Naming this variable stick because our puppy will go fetch it.
var fetch = process.argv[3];

// making the functions to be a cool kid function user
function OMDBrequest(){
    request("https://www.omdbapi.com/?t=" + fetch + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("The title of the movie is: " + JSON.parse(body).Title);
            console.log("The year the movie was released is: " + JSON.parse(body).Released);
            console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
            console.log("The Rotten Tomatoes rating of the movie is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movie was produced in: " + JSON.parse(body).Country);
            console.log("The language of the movie is: " + JSON.parse(body).Language);
            console.log("The actors in the movie are: " + JSON.parse(body).Actors);
            console.log("The plot of the movie is: " + JSON.parse(body).Plot);
        }
        else {
            console.log("Uh-oh! An error has occured! Please try again later.");
        }
    })
}

function BITrequest() {
    request("https://rest.bandsintown.com/artists/" + fetch + "/events?app_id=codingbootcamp", function (error, response, body) {        
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body)
            console.log("Upcoming concerts for " + fetch + ": ")
            for(var set in body) {
                var date = moment(body[set].datetime).format("MM/DD/YYYY")
                console.log("The venue is: " + body[set].venue.name);
                console.log("The venue is at: " + body[set].venue.city + ", " + body[set].venue.country);
                console.log("The concert is on: " + date);
                console.log("______________________________________"); 
            }
        }
        else {
            console.log("Uh-oh! An error has occured! Please try again later.");
        }
    })
}

function spotifyRequest() {
    var spotify = new Spotify(keys.spotify);
    spotify.search({type: "track", query: fetch}, function(err, data) {
        if (!err) {
            console.log("The artist of the song is: " + data.tracks.items[0].artists[0].name);
            console.log("The song you searched for is: " + data.tracks.items[0].name);
            console.log("The album the song is on is: " + data.tracks.items[0].album.name);
            console.log("You can hear the song here: " + data.tracks.items[0].preview_url);
        }
        else {
            console.log("Uh-oh! An error has occured! Please try again later.");
        }
    })
}

// OMDB
if (operator == "movie-this") {
    if (fetch == undefined) {
        fetch = "Mr. Nobody";
    }
    OMDBrequest()
}

// Bands in Town
else if (operator == "concert-this") {
    if (fetch == undefined) {
        fetch = "Hoobastank";
    }
    BITrequest()
}

// Spotify
else if (operator == "spotify-this-song") {
    if (fetch == undefined) {
        var spotify = new Spotify(keys.spotify);
        spotify.search({type: "track", query: "The Sign"}, function(err, data) {
            if (!err) {
                console.log("The artist of the song is: " + data.tracks.items[7].artists[0].name);
                console.log("The song you searched for is: " + data.tracks.items[7].name);
                console.log("The album the song is on is: " + data.tracks.items[7].album.name);
                console.log("You can hear the song here: " + data.tracks.items[7].preview_url);
            }
            else {
                console.log("Uh-oh! An error has occured! Please try again later.");
            }
        })
    }
    else {
        spotifyRequest()
    }
}

// Random
else if (operator == "do-what-it-says") {
    var fs = require("fs");
    fs.readFile("random.text", "utf8", function(error, data) {
        if (error) {
            console.log("There was an " + error + "!");
        }
        else {
            var dataArr = data.split(",");
            console.log(dataArr[1]);
            fetch = dataArr[1];
            if (dataArr[0] == "movie-this") {
                OMDBrequest();
            }
            else if (dataArr[0] == "concert-this") {
                BITrequest();
            }
            else if (dataArr[0] == "spotify-this-song") {
                spotifyRequest();
            }
            else {
                console.log("There's nothing to do with this! Run the program again with a different input.");
            }
        }
    })
}

// Catch all
else {
    console.log("Invalid operator. Please choose to either 'movie-this', 'concert-this', 'spotify-this-song', or 'do-what-it-says'. Thank you.");
}


