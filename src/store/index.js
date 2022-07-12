import { defineStore } from 'pinia'

import IframeLoader from 'youtube-iframe';
import videoIdExtractor from '../utils/youtubeVideoIdExtractor.js';
import TelegramWorker from '../api/telegram.js'



export const main = defineStore('main', {
  state: () => ({
    playlist: [],
    player: {},
    telegramWorker: {},
    isFirstSong: true
  }),

  actions: {
    ADD_SONG (link) {
      let playlist = this.playlist;
      playlist.push(link);
    },
    POP_SONG () {
      this.playlist.pop()
    },

    INIT_PLAYER ({elementId, options}) {
      const handlers = {
        onplay: function (link) {
        this.ADD_SONG(link);
        if (this.isFirstSong) {
          this.NEXT_SONG()
          this.player.unMute();
          this.firstSong = false;
          return;
        }
        if (this.playlist.length === 1) {
          this.PLAY()
        }
      }.bind(this)
     }
     this.telegramWorker = new TelegramWorker(process.env.VUE_APP_BOT_TOKEN, handlers)

      IframeLoader.load(function () {
         this.player = new window.YT.Player(elementId, options);
         window.player = this.player;
      }.bind(this));
    },
    PLAY () {
      this.player.playVideo();
    },
    PAUSE () {
      this.player.pauseVideo();
    },
    NEXT_SONG () {
      const playlist= this.playlist;
      const player = this.player;

      if (playlist.length === 0) {
        player.seekTo(player.getDuration())
        return;
      }

      const firstLink = playlist[0];
      const videoId = videoIdExtractor(firstLink)
      player.loadVideoById(videoId);
      this.POP_SONG();
    },
  },
});
