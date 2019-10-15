import { Player, PlayerEvent } from 'bitmovin-player/modules/bitmovinplayer-core';
import { Source } from './models/source-class';
import { EventEmitter } from 'events';
export declare interface Playlist {
    on(event: 'quarterDone', listener: () => void): this;
    on(event: 'halfDone', listener: () => void): this;
    on(event: 'threeQuartersDone', listener: () => void): this;
    on(event: 'videoComplete', listener: () => void): this;
    on(event: 'playlistComplete', listener: () => void): this;
    on(event: 'playlistStarted', listener: () => void): this;
    on(event: 'transition', listener: (videoEnding: Source, videoStarting: Source) => void): this;
}
export class Playlist extends EventEmitter {
    constructor (
        private player: any,
        private sources: Source[],
        private timeBetweenVideos: number = 0,
        private videoToStart: number = 0,
        private startTime: number = 0,
        private progressMilestones: boolean = false
    ) {
        super();
    }

    // create a new playlist
    loadPlaylist() {    

        // set listener to load the next video once each video in the playlist has finished
        this.player.on(PlayerEvent.PlaybackFinished, () => {
            const index = this.sources.indexOf(this.player.getSource());
            setTimeout(() => {
                if (this.sources[index + 1]) {
                    this.emit('transition', this.sources[index], this.sources[index+1]);
                    this.player.load(this.sources[index +1]).then(() => {
                        console.log('Successfully loaded source with name: ' + this.sources[index + 1].title);
                        this.progressMilestonesFunc();
                    }, (error) => {
                        console.log('Error while loading source', error);
                    });
                } else {
                    this.emit('playlistComplete');
                }
            }, this.timeBetweenVideos*1000);
        });



        // load requested video as the first video
        this.player.load(this.sources[this.videoToStart - 1]).then(() => {
            console.log('Successfully loaded source with name: ' + this.sources[this.videoToStart - 1].title + " , length: " + this.player.getDuration());
            this.progressMilestonesFunc();
            this.player.seek(this.startTime);
            this.emit('playlistStarted');
        }, (error) => {
            console.log('Error while loading source', error);
        });
    }

    progressMilestonesFunc() {
        // enable progress milestones if the user has selected that option
        let displayQuater = true;
        let displayHalf = true;
        let displayThreeQuarters = true;
        let displayComplete = true;
        const videoDuration = this.player.getDuration();
        if (this.progressMilestones) {
            this.player.on(PlayerEvent.TimeChanged, () => {
                const now = Math.floor(this.player.getCurrentTime());
                if (now == Math.floor(videoDuration*0.25) && displayQuater) {
                    this.emit('quarterDone');
                    displayQuater = false;
                }
                if (now == Math.floor(videoDuration*0.5) && displayHalf) {
                    this.emit('halfDone');
                    displayHalf = false;
                }
                if (now == Math.floor(videoDuration*0.75) && displayThreeQuarters) {
                    this.emit('threeQuartersDone');
                    displayThreeQuarters = false;
                }
                if (now == Math.floor(videoDuration) && displayComplete) {
                    this.emit('videoComplete');
                    displayComplete = false;
                }
            });
        }
    }


    skip() {
        const currentSource = this.player.getSource();
        const skipIndex = this.sources.indexOf(currentSource) + 1;
        console.log(skipIndex);
        if (this.sources[skipIndex]) {
            this.player.load(this.sources[skipIndex]).then(() => {
                this.player.play();
                this.progressMilestonesFunc();
            });
        } else {
            this.player.unload();
            this.emit('playlistCompete');
        }
    }

    previous() {
        const currentSource = this.player.getSource();
        const prevIndex = this.sources.indexOf(currentSource) - 1;
        if (this.sources[prevIndex]) {
            this.player.load(this.sources[prevIndex]).then(() => {
                this.player.play();
              this.progressMilestonesFunc();
            });
        } else {
            this.player.load(currentSource).then(() => {
                this.player.play();
                this.progressMilestonesFunc();
                this.emit('playlistStarted');
            });
        }
    }

    addSong(video: Source, index: number) {
        this.sources.splice(index, 0, video);
    }

    addSongToBeginning(video: Source) {
        this.sources.unshift(video);
    }

    addSongToEnd(video: Source) {
        this.sources.push(video);
    }

    removeSong(video: Source) {
        this.skip();
        this.sources = this.sources.filter(source => {
            return source != video;
        });
    }

    scheduleAd(url, type, position) {
        this.player.ads.schedule({
            tag: {
                url: url,
                type: type
            },
            id: 'playerAd',
            position: position
        });
    }
}

