import Vue from 'vue';
import Vuex from 'vuex';
import IframeLoader from 'youtube-iframe';
import videoIdExtractor from '../utils/youtubeVideoIdExtractor.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playlist: [],
    player: {}
  },
  mutations: {
    INIT_PLAYER: (state, player) => {
      state.player = player;
      window.player = state.player;
    },
    ADD_SONG: (state, link) => {
      let playlist = state.playlist;
      playlist.push(link);
    },
    POP_SONG: (state)=> state.playlist.pop()
  },

  actions: {
    INIT_PLAYER: ({ commit }, {elementId, options}) => {
      IframeLoader.load(() => {
        commit('INIT_PLAYER', new window.YT.Player(elementId, options));
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
