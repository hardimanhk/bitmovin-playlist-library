import { Player, PlayerEvent } from 'bitmovin-player/modules/bitmovinplayer-core';
import { Source } from './models/source-class';

export class Playlist {
    constructor (
        private player: any,
        private sources: Source[],
        private timeBetweenVideos: number = 0,
        private videoToStart: number = 0,
        private startTime: number = 0,
        private progressMilestones: boolean = false
    ) {}

    // create a new playlist
    loadPlaylist() {    

        // set listener to load the next video once each video in the playlist has finished
        this.player.on(PlayerEvent.PlaybackFinished, () => {
            const index = this.sources.indexOf(this.player.getSource());
            setTimeout(() => {
                if (this.sources[index + 1]) {
                    this.player.load(this.sources[index +1]).then(() => {
                        console.log('Successfully loaded source with name: ' + this.sources[index + 1].title);
                        this.progressMilestonesFunc();
                    }, (error) => {
                        console.log('Error while loading source', error);
                    });
                } // else emit playlist ended event
            }, this.timeBetweenVideos*1000);
        });



        // load requested video as the first video
        this.player.load(this.sources[this.videoToStart - 1]).then(() => {
            console.log('Successfully loaded source with name: ' + this.sources[0].title + " , length: " + this.player.getDuration());
            this.progressMilestonesFunc();
            this.player.seek(this.startTime);
            // emit playlist started event
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
                    window.alert('Your video is 25% complete.');
                    displayQuater = false;
                }
                if (now == Math.floor(videoDuration*0.5) && displayHalf) {
                    window.alert('Your video is 50% complete.');
                    displayHalf = false;
                }
                if (now == Math.floor(videoDuration*0.75) && displayThreeQuarters) {
                    window.alert('Your video is 75% complete.');
                    displayThreeQuarters = false;
                }
                if (now == Math.floor(videoDuration) && displayComplete) {
                    window.alert('Your video is 100% complete.');
                    displayComplete = false;
                }
            });
        }
    }

    skip() {
        const currentSource = this.player.getSource();
        const skipIndex = this.sources.indexOf(currentSource) + 1;
        if (this.sources[skipIndex]) {
            this.player.load(this.sources[skipIndex]).then(() => {
                this.progressMilestonesFunc();
                this.player.play();
            });
        } else {
            this.player.unload();
            // emit playlist ended event
        }
    }

    previous() {
        const currentSource = this.player.getSource();
        const prevIndex = this.sources.indexOf(currentSource) - 1;
        if (this.sources[prevIndex]) {
            this.player.load(this.sources[prevIndex]).then(() => {
                this.progressMilestonesFunc();
                this.player.play();
            });
        } else {
            this.player.load(currentSource).then(() => {
                this.progressMilestonesFunc();
                this.player.play();
                // emit playlist started event
            });
        }
    }

    addNextSong() {

    }

    addSongToBeginning() {

    }

    addSongToEnd() {

    }
}

