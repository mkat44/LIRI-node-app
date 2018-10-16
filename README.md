# LIRI-node-app
Node LIRI BOT

LIRI is a little Node application that takes in 4 basic commands and returns results based on those commands. All information is initialized using "node liri.js" and then the commands are passed in as the second and third arguments.

* concert-this

The command "concert-this" accepts an Artist or Band's name in the third argument slot. By entering an artist or band, LIRI returns that artist or band's upcoming concerts. If no band or artist is entered, LIRI will return with the information for a default band. If a band or artist has more than one word as their name, they should be listed in quotes or the returned data will not be as expected.

Screenshots\concert-this-with-input.png
Screenshots\concert-this-without-input.png

* movie-this

The command "movie-this" accepts a movie title in the third argument slot. By entering a movie title, LIRI returns information about the movie. If no movie is entered, LIRI will return with information about a default movie. If a movie title is more than one word, it should be entered in quotes or the returned data will not be as expected.

Screenshots\movie-this-with-input.png
Screenshots\movie-this-without-input.png

* spotify-this-song

The command "spotify-this-song" accepts a song title and returns information about that song, as well as a link that can be used to preview the song using Spotify. If no movie is entered, LIRI will return with information about a default song. If a movie title is more than one word, it should be entered in quotes in order to return the correct data.

Screenshots\spotify-this-song-with-and-without-inputs.png

* do-what-it-says

The command "do-what-it-says" pulls in the random.text file and uses the text within to run the previous commands. Based on what is in random.text, either concert-this, movie-this, or spotify-this-song will run. 

Screenshots\do-what-it-says.png

* If none of these are entered, LIRI will prompt the user to enter correct prompts.

Screenshots\error.png