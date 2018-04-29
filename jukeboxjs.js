            var music = document.getElementById('music');
            var select = document.querySelector("select");
            var sourceTag = document.querySelector("#music source");
            var stopSong = document.getElementById('stButton');

            var myJukebox = {



                playAudio: function () {

                    if (music.paused) {

                        document.getElementById('plButton').style.display = "none"
                        document.getElementById('paButton').style.display = "block"
                        music.play();
                        plButton.className = "";
                        plButton.className = "pause";


                    } else {

                        document.getElementById('plButton').style.display = "block"
                        document.getElementById('paButton').style.display = "none"
                        music.pause();
                        paButton.className = "";
                        paButton.className = "play";

                    }
                },
                nextAudio: function () {
                    select.selectedIndex++;
                    select.selectedIndex %= select.length;
                    sourceTag.src = select.value;
                    music.load();
                    music.play();
                }
            }
            music.addEventListener("ended", function () {
                myJukebox.nextAudio();
            })

            select.addEventListener("change", function () {
                sourceTag.src = select.value;
                music.load();
                music.play();
            })

            stopSong.addEventListener('click', function () {
                
                document.getElementById('plButton').style.display = "block"
                document.getElementById('paButton').style.display = "none"
                music.pause();
                music.load();
            })


            // Add stop method, Song end - next song