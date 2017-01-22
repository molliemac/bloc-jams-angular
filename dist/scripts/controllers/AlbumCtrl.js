<<<<<<< HEAD
(function(){
     function AlbumCtrl() {
         this.albumData = albumPicasso;
         this.songs = [];
         for (var i=0; i < this.albumData.songs.length; i++) {
            this.songs.push(this.albumData.songs[i])
=======
(function() {
     function AlbumCtrl(Fixtures) {
        this.albumData = Fixtures.getAlbum();
        this.songs = [];
        for (var i=0; i < this.albumData.songs.length; i++) {
            this.songs.push(this.albumData.songs[i]);
>>>>>>> checkpoint-6-services-part-1
        }
     }
 
     angular
         .module('blocJams')
<<<<<<< HEAD
         .controller('AlbumCtrl', AlbumCtrl);
=======
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
>>>>>>> checkpoint-6-services-part-1
 })();