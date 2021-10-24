<template>
  <div class="player__wrapper">
    <video
      autoplay
      muted
      ref="videoPlayer"
      class="video-js"
    ></video>
  </div>
</template>

<script>
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";
import {mapMutations, mapGetters} from 'vuex';

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
  computed: {
    ...mapGetters(['getPlaylist'])
  },
  watch: {
    getPlaylist (newVal)  {
      if (this.firstSong) {
        this.switchSongs()
        this.player.muted(false);
        this.firstSong = false;
        return;
      }
      if(newVal.length === 1 && !this.firstSong) {
        this.switchSongs()
      }
    }
  },
  data() {
    return {
      player: null,
      firstSong: true
    };
  },
  methods: {
    ...mapMutations(['RESET_SONGS', 'POP_SONG']),
    switchSongs () {
      this.player.src(this.getPlaylist[0]);
      this.POP_SONG();
      this.player.play();
      this.$emit('song-switched', this.player.duration())
    }
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
  this.player.on('ended', this.switchSongs);
  this.player.on('loadeddata', () => {
    console.log('loadeddata');
    window.player.play()
  });
  this.player.on('timeupdate', () => {
    this.$emit('timeupdate', this.player.currentTime())
});

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
