<template>
  <div>
    <div id="yt-player"></div>
  </div>
</template>

<script>

import { mapActions, mapStores} from 'pinia';
import { main } from '@/store/index.js';
import STATES from '@/constants/playerStates.js';

export default {
  name: "VideoPlayer",
  computed: {
    ...mapStores(main)
  },
  methods: {
    ...mapActions(main, ['NEXT_SONG', 'INIT_PLAYER']),
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
