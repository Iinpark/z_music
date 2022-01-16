<template>
  <div>
    <track-information />
    <h1>Плеер</h1>
    <Player
      :options="options"
      @timeupdate="timeupdate"
      @song-switched="(t) => time.total = formatTime(t)"
    />
    <Telegram/>
    <span>{{time.current}} / {{time.total}}</span>
  </div>
</template>

<script>
import Player from '@/components/Player.vue'
import Telegram from '../components/Telegram.vue'
import TrackInformation from '../components/TrackInformation.vue'
import { formatTime } from '@/utils'

export default {
  methods: {
    formatTime,
    addToPlaylist(val){
      console.log(val);
    },
    timeupdate (seconds) {
      this.time.current = formatTime(seconds)
    }
  },
  data () {
    return {
      options: {
        sources:[{
          type:'video/youtube',
          src: 'https://www.youtube.com/watch?v=WYAicbst-G0'
        }]
      },
      time: {
        current: 0,
        total: 0
      }
    }
  },
  components: {
    Player,
    Telegram,
    TrackInformation
  }
}
</script>

<style>

</style>