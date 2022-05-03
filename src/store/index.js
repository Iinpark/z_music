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
  },
  actions: {
    INIT_PLAYER: ({ commit }, {elementId, onload}) => {
      IframeLoader.load(() => {
        commit('INIT_PLAYER', new window.YT.Player(elementId, onload));
      });
    },
    PLAY: ({ state }) => {
      state.player.play();
    },
    PAUSE: ({ state }) => {
      state.player.pause();
    },
    NEXT_SONG: ({ state }) => {
      state.player.nextVideo();
    },
    ADD_SONG: ({ getters }, link) => {
      let updatedPlaylist = getters.player.getPlaylist();

      if (updatedPlaylist) {
        updatedPlaylist.shift();
      }

      updatedPlaylist.push(videoIdExtractor(link));
      getters.player.cuePlaylist(updatedPlaylist);
    },
  },
  getters: {
    getPlaylist: (state) => state.playlist,
    player: (state) => state.player,
  },
});
