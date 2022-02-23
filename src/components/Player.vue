<template>
  <div>
    <div id="yt-player"></div>
  </div>
</template>

<script>

import { mapGetters, mapActions} from 'vuex';

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
    getPlaylist ()  {
      if (this.firstSong) {
        this.switchSongs()
        this.player.muted(false);
        this.firstSong = false;
        return;
      }
    }
  },
  data() {
    return {
      firstSong: true
    };
  },
  methods: {
    ...mapActions(['NEXT_SONG', 'INIT_PLAYER']),
    switchSongs () {
      this.NEXT_SONG()
      this.$emit('song-switched', this.player.duration())
    }
  },
  mounted() {
    this.INIT_PLAYER('yt-player');
  
  this.player.on('ended', this.switchSongs);
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
