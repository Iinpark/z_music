import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

const playerModule = {
  state: {
    player: {},
  },
  mutations: {
    INIT_PLAYER: (state, settings) => {
		state.player = videojs(settings);
		window.player = state.player;
	},
  },
  actions: {
    PLAY: ({ state }) => {
      state.player.play()
    },
    PAUSE: ({ state }) => {
      state.player.pause()
    },
    NEXT_SONG: ({ state, commit, getters }) => {
      const nextSong = getters.getPlaylist[0].src
      if (nextSong) {
        state.player.src(nextSong);
        commit('POP_SONG');
        state.player.play();
      } else if (!nextSong) {
        state.player.pause()
        state.player.currentTime(99999999)
      }
     
    }
  },
  getters: {
    player: (state) => state.player,
  },
};

export default playerModule;
