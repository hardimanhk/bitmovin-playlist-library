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
```
import { Playlist } from 'hardiman-bitmovin-playlist-lib';
const playlist = new Playlist(player, sources, int1, int2, int3, milestones);
```
Here is a guide to each of the inputs for the new Playlist:
* player - your initialized Bitmovin player object
* sources - an array of video sources
* int1 - an integer to add time between videos (in seconds)
* int2 - an integer representing which video should start upon beginning the playlist
* int3 - an integer representing the time at which the first video shoud start (in seconds)
* milestones - a boolean representing if you wish to see milestones representing when the video is 25%, 50%, 75%, or 100% done

Here is an example of instantiating a new Playlist:
```
const player = new Player(document.getElementById('player'), conf);
let sources = [
    {
        title: 'First Video',
        description: 'This is the first video in the lineup',
        hls: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        poster: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/poster.jpg',
    },
    {
        title: 'Second Video',
        description: 'This is the second video in the lineup',
        hls: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        poster: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/poster.jpg'
    },    
    {
        title: 'Third Video',
        description: 'This is the third video in the lineup',
        hls: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        poster: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/poster.jpg'
    },    
    {
        title: 'Fourth Video',
        description: 'This is the fourth video in the lineup',
        hls: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        poster: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/poster.jpg'
    },
    {
        title: 'Fifth Video',
        description: 'This is the fifth video in the lineup',
        hls: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        poster: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/poster.jpg'
    },
];
const playlist = new Playlist(player, sources, 0, 2, 0, true);
```

To load the playlist simply call `Playlist.loadPlaylist()`

There is an attached demo page in this repo, to load the demo page clone this repo and run `npm i` then `npx webpack-dev-server`. The demo page will be available at http://localhost:3035