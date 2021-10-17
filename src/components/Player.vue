<template>
  <div class="player__wrapper">
    <video
      ref="videoPlayer"
      class="video-js"
    ></video>
  </div>
</template>

<script>
import videojs from "video.js";
import "videojs-youtube";
import "videojs-playlist";
import "video.js/dist/video-js.css";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      player: null,
      playlist: [],
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      {
        techOrder: ["youtube"],
        ...this.options,
      },
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
	window.player = this.player;
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style scoped>
	.player__wrapper {
		max-height: 200px;
		height: 200px;
	}
</style>
