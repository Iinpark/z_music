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

import {mapMutations, mapGetters, mapActions} from 'vuex';

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
    ...mapGetters(['getPlaylist','player'])
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
      firstSong: true
    };
  },
  methods: {
    ...mapMutations(['RESET_SONGS', 'POP_SONG', 'INIT_PLAYER',]),
    ...mapActions(['NEXT_SONG']),
    switchSongs () {
      this.NEXT_SONG()
      this.$emit('song-switched', this.player.duration())
    }
  },
  mounted() {
    this.INIT_PLAYER(
      this.$refs.videoPlayer,
      {
        techOrder: ["youtube"],
        ...this.options,
      },
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  
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
