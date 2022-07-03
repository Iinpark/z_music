<template>
  <div>
    <track-information />
    <h1>Плеер</h1>
    <Player
      @timeupdate="timeupdate"
    />
    <span>{{time.current}} / {{time.total}}</span>
  </div>
</template>

<script>
import Player from '@/components/Player.vue'
import TrackInformation from '../components/TrackInformation.vue'
import { formatTime, makeTimer } from '@/utils'

export default {
  methods: {
    formatTime,
    addToPlaylist(val){
      console.log(val);
    },
    timeupdate (seconds) {
      this.time.total = formatTime(seconds);
      makeTimer(seconds, (secsLeft) => this.time.current = formatTime(secsLeft))
    }
  },

  data () {
    return {
      time: {
        current: 0,
        total: 0
      }
    }
  },
  components: {
    Player,
    TrackInformation
  }
}
</script>

<style>

</style>