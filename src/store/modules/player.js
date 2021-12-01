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
    NEXT_SONG: ({ state, dispatch, getters }) => {
      state.player.src(getters.getPlaylist[0]);
      dispatch('POP_SONG');
      state.player.play();
    }
  },
  getters: {
    player: (state) => state.player,
  },  
};

export default playerModule;
