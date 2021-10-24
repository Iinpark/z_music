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
  actions: {},
  getters: {
    player: (state) => state.player,
  },
};

export default playerModule;
