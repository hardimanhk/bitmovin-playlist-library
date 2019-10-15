# bitmovin-playlist-library

## This library extends the functionality of the Bitmovin video player to accept a playlist.

The library contains functions to:
* Accept a playlist and playback each video in order
* Allow the user to add and remove videos from the playlist
* Allow the user to set a pause time period between videos 
* Expose events such as:
    * Playlist Completed
    * Transitions between playlist items
    * Markers when each video is 25%, 50%, 75%, and 100% complete
* Support starting the playlist a video that is not the first video in the list
* Allow ad insertion 

To initialize a playlist import and instantiate a new playlist instance as shown below:
