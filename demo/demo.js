import { Player, PlayerEvent } from 'bitmovin-player/modules/bitmovinplayer-core';
import EngineBitmovinModule from 'bitmovin-player/modules/bitmovinplayer-engine-bitmovin';
import MseRendererModule from 'bitmovin-player/modules/bitmovinplayer-mserenderer';
import HlsModule from 'bitmovin-player/modules/bitmovinplayer-hls';
import AbrModule from 'bitmovin-player/modules/bitmovinplayer-abr';
import ContainerTSModule from 'bitmovin-player/modules/bitmovinplayer-container-ts';
import SubtitlesModule from 'bitmovin-player/modules/bitmovinplayer-subtitles';
import SubtitlesCEA608Module from 'bitmovin-player/modules/bitmovinplayer-subtitles-cea608';
import PolyfillModule from 'bitmovin-player/modules/bitmovinplayer-polyfill';
import StyleModule from 'bitmovin-player/modules/bitmovinplayer-style';

import { Playlist } from '../dist/playlist';

import { UIFactory } from 'bitmovin-player/bitmovinplayer-ui';
import 'bitmovin-player/bitmovinplayer-ui.css';

Player.addModule(EngineBitmovinModule);
Player.addModule(MseRendererModule);
Player.addModule(HlsModule);
Player.addModule(AbrModule);
Player.addModule(ContainerTSModule);
Player.addModule(SubtitlesModule);
Player.addModule(SubtitlesCEA608Module);
Player.addModule(PolyfillModule);
Player.addModule(StyleModule);

const conf = {
    key: 'YOUR KEY HERE',
    ui: false,
    advertising: {}
};

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

const source = {
    hls: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
    poster: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/poster.jpg'
};

const player = new Player(document.getElementById('player'), conf);

UIFactory.buildDefaultUI(player);

const playlist = new Playlist(player, sources, 0, 2, 0, true);

playlist.loadPlaylist();

function playlistItems() {
    document.getElementById('playlist-items').innerHTML = '';
    for(let i = 0; i < playlist.sources.length; i++) {
        let sourceItem = document.createElement('div');
        let button = document.createElement('button');
        sourceItem.innerHTML = `${playlist.sources[i].title}`
        sourceItem.className = 'source-item';
        button.textContent = 'remove';
        button.className = 'remove-button';
        button.id = `${i}`;
        button.addEventListener('click', removeButtonClick);
        sourceItem.appendChild(button);
        document.getElementById('playlist-items').appendChild(sourceItem);
    }
}

playlistItems();

document.getElementById('skip').addEventListener('click', () => {
    playlist.skip();
});

document.getElementById('previous').addEventListener('click', () => {
    playlist.previous();
});

document.getElementById('add-beginning').addEventListener('click', () => {
    const newName = document.getElementById('video-name').value;
    const newHLS = document.getElementById('hls').value;
    const newVid = {
        title: newName,
        hls: newHLS
    }
    playlist.addSongToBeginning(newVid);
    playlistItems();
});

document.getElementById('add-end').addEventListener('click', () => {
    const newName = document.getElementById('video-name').value;
    const newHLS = document.getElementById('hls').value;
    const newVid = {
        title: newName,
        hls: newHLS
    }
    playlist.addSongToEnd(newVid);
    playlistItems();
});

document.getElementById('add-next').addEventListener('click', () => {
    const newName = document.getElementById('video-name').value;
    const newHLS = document.getElementById('hls').value;
    const newVid = {
        title: newName,
        hls: newHLS
    }
    const index = playlist.sources.indexOf(player.getSource()) + 1;
    playlist.addNextSong(newVid, index);
    playlistItems();
});

document.getElementById('scheudle-ad-button').addEventListener('click', () => {
    const adType = document.getElementById('adType').value;
    const manifestUrl = document.getElementById('ad-server-url').value || 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/32573358/skippable_ad_unit&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=http%3A%2F%2Freleasetest.dash-player.com%2Fads%2F&description_url=[description_url]&correlator=[random]';
    const position = document.getElementById('schedule-position').value;
    playlist.scheduleAd(manifestUrl, adType, position);
});

function removeButtonClick() {
    console.log('Button with id ' + this.id + ' was removed');
    playlist.removeSong(sources[this.id]);
    playlistItems();
}

playlist.on('quarterDone', () => {
    console.log('Quarter done emitted.');
});

playlist.on('halfDone', () => {
    console.log('half done emitted.');
});

playlist.on('threeQuartersDone', () => {
    console.log('Three quarters done emitted.');
});

playlist.on('videoComplete', () => {
    console.log('Song complete emitted.');
});

playlist.on('playlistStarted', () => {
    console.log('Playlist started emitted.');
});

playlist.on('playlistComplete', () => {
    console.log('Playlist complete emitted.');
});

playlist.on('transition', (source1, source2) => {
    console.log(source1.title + ' is ending, ' + source2.title + ' is starting.');
});