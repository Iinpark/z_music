import Vue from 'vue';
import Vuex from 'vuex';
import IframeLoader from 'youtube-iframe';
import videoIdExtractor from '../utils/youtubeVideoIdExtractor.js';
import TelegramWorker from '../api/telegram.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playlist: [],
    player: {},
    telegramWorker: {}
  },
  mutations: {
    INIT_PLAYER: (state, {player, telegramWorker}) => {
      state.player = player;
      state.telegramWorker = telegramWorker;
      window.player = state.player;
    },
    ADD_SONG: (state, link) => {
      let playlist = state.playlist;
      playlist.push(link);
    },
    POP_SONG: (state)=> state.playlist.pop()
  },

  actions: {
    INIT_PLAYER: ({ commit}, {elementId, options}) => {
      const handlers = {
        onplay: (link) => {
        commit('ADD_SONG',link);
        if (this.getPlaylist.length === 1) {
          this.PLAY()
        }
      }
     }

      IframeLoader.load(() => {
        commit('INIT_PLAYER', {
         player: new window.YT.Player(elementId, options),
         telegramWorker: new TelegramWorker(process.env.VUE_APP_BOT_TOKEN, handlers)
        });
      });
    },
    PLAY: ({ state }) => {
      state.player.play();
    },
    PAUSE: ({ state }) => {
      state.player.pause();
    },
    NEXT_SONG: ({ state, commit }) => {
      if (state.playlist.length === 0) {
        state.player.seekTo(state.player.getDuration())
        return;
      }

      const firstLink = state.playlist[0];
      const videoId = videoIdExtractor(firstLink)
      state.player.loadVideoById(videoId);
      commit ('POP_SONG');
    },
  },

  getters: {
    getPlaylist: (state) => state.playlist,
    player: (state) => state.player,
  },
});
