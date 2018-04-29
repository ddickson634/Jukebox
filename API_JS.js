const sjc = new myJukeboxApi();
var stopSong = stopSong;

function myJukeboxApi() {
    this.backupSong = backupSong;
    this.playNext = playNext;
    this.pauseSong = pauseSong;
    this.skipSong = skipSong;
    this.stopSong = stopSong;
    this.searchTracks = searchTracks;

    // this sends the api key and gets the tracks
    SC.initialize({
        client_id: 'f665fc458615b821cdf1a26b6d1657f6'
    });
    SC.get("/tracks").then(function (response) {
        songs = response;
        console.log(response);
    });

    var myPlayer;
    var songs = [];
    var currentSong = 0;
    //this is the info displayed
    function songInfo() {
        document.getElementById("title").innerHTML = songs[currentSong].title;
        document.getElementById("genre").innerHTML = songs[currentSong].genre;
        //takes url and passes it to the href in the html
        document.getElementById("songLink").setAttribute("href", songs[currentSong].permalink_url);
        document.getElementById("artistLink").setAttribute("href", songs[currentSong].user.permalink_url);
        document.getElementById("artwork").src = songs[currentSong].artwork_url;
    }
    //this is the play function
    function playNext() {
        SC.stream('/tracks/' + songs[currentSong].id).then(function (player) {
            console.log(player);
            myPlayer = player;
            player.play();
            songInfo();
            player.on("finish", function () {
                currentSong += 1;
                playNext();
            });
        })
    }

    function pauseSong() {
        myPlayer.pause();
    }

    //goes to the next song
    function skipSong() {
        currentSong += 1;
        SC.stream('/tracks/' + songs[currentSong].id).then(function (player) {
            console.log(player);
            player.play();
        });
        songInfo();
        if (currentSong == songs.length) {
            currentSong = 0;
        }
    }

    //backs up to the song before
    function backupSong() {
        currentSong -= 1;
        SC.stream('/tracks/' + songs[currentSong].id).then(function (player) {
            console.log(player);
            player.play();
        });
        songInfo();
        if (currentSong < 0) {
            currentSong = songs.length - 1;
        }
    }
    //stops song by jumping to position 0 in track.  
    function stopSong() {
            myPlayer.pause();
            myPlayer.seek(0);
    }
        
    //lets you put in a new search for other tracks
    function searchTracks() {
        SC.initialize({
            client_id: 'f665fc458615b821cdf1a26b6d1657f6'
        });
        SC.get("/tracks", {
            q: document.getElementById("searchText").value
        }).then(function (response) {
            songs = response;
            console.log(response);
        });
        playNext();
        songInfo();
    }
}