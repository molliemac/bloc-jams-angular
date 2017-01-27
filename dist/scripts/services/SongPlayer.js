(function () {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
       
        /**
        * @desc Sets current album globally
        * @param {Object} 
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
       
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function (song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                 $rootScope.$apply(function() {
                     SongPlayer.currentTime = currentBuzzObject.getTime();
                 });
             });

            SongPlayer.currentSong = song;
        };
      
        /**
        * @function playSong
        * @desc Plays current Buzz Object and sets property of the song object to true
        * @param {Object} song
        */
        var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
         /**
        * @function stopSong
        * @desc Stops current Buzz Object and sets property of the song object to null
        * @param {Object} song
        */
        var stopSong = function (song) {
            currentBuzzObject.stop();
            song.playing = null;
        };
        
        /**
        * @function getSongIndex
        * @desc Accesses index of a song
        * @type {Object} song
        */
        var getSongIndex = function(song) {
         return currentAlbum.songs.indexOf(song)
        }
        
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;
       
        /**
        * @function SongPlayer.play
        * @desc Play method creates new Buzz object and checks to see whether song is playing or is paused, then calls Buzz's own play method on the object.
        * @param {Object} song
        */
        SongPlayer.play = function (song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song){
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
       
        /**
        * @function SongPlayer.pause
        * @desc Checks to see state of currentBuzzObject and pauses song when called 
        * @param {Object} song
        */
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function SongPlayer.previous
        * @desc Stores current song index and subtracts that current index by one to get to previous song index 
        * @param {Object} song
        */
        SongPlayer.previous = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
            }
        };
        
         /**
        * @function SongPlayer.previous
        * @desc Stores current song index and switches to next song
        * @param {Object} song
        */
        SongPlayer.next = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex = (currentAlbum.songs.length + currentSongIndex + 1)%currentAlbum.songs.length;
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        return SongPlayer;
    }

    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();