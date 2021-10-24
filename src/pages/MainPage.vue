<template>
  <div>
    <h1>Плеер</h1>
    <Player :options="options" />
    <Telegram @play:add="addToPlaylist" />
  </div>
</template>

<script>
import Player from '@/components/Player.vue'
import Telegram from '../components/Telegram.vue'
export default {
  methods: {
    addToPlaylist(val){
      console.log(val);
    }
  },
  data () {
    return {
      options: {
        sources:[{
          type:'video/youtube',
          src: 'https://www.youtube.com/watch?v=WYAicbst-G0'
        }]
      }
    }
  },
  components: {
    Player,
    Telegram
  }
}
</script>

<style>

</style>