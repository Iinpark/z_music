import Vue from 'vue'
import Vuex from 'vuex'
import playerModule from './modules/player';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playlist: []
  },
  mutations: {
    ADD_SONG: (state, source) => {
      state.playlist.push(source)
    },
    RESET_SONGS: (state) => {
      state.playlist = [];
    },
    POP_SONG: (state) => {
      state.playlist.pop()
    }
  },
  actions: {
    ADD_SONG: ({commit}, link) => {
      const payload = {
          src: link,
          type: 'video/youtube'
      };
      commit('ADD_SONG', payload)
    }
  },
  getters: {
    getPlaylist: state => state.playlist 
  },
  modules: {playerModule}
})
