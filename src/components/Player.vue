<template>
  <div>
    <div id="yt-player"></div>
  </div>
</template>

<script>

import { mapGetters, mapActions} from 'vuex';
import STATES from '@/constants/playerStates.js';

export default {
  name: "VideoPlayer",

  computed: {
    ...mapGetters(['getPlaylist','player'])
  },
  watch: {
    getPlaylist ()  {
      if (this.firstSong) {
        this.switchSongs()
        this.player.unMute();
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
    },
    timeUpdate (...data) {
      this.$emit('timeupdate', this.player.duration())
      console.log(...data);
    }
  },
  mounted() {
    this.INIT_PLAYER({
      elementId: 'yt-player',
      options: {
        events: {
          'onStateChange':({data}) =>  {

            if (data === STATES.PLAYING) {
              this.$emit('timeupdate', this.player.getDuration())
            }
          }
        }
      }
    });
  },
};
</script>
