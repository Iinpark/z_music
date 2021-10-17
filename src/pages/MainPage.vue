<template>
  <div>
    <h1>Плеер</h1>
    <Player :options="options" />
    <Telegram />
  </div>
</template>

<script>
import Player from '@/components/Player.vue'
import Telegram from '../components/Telegram.vue'
export default {
  data () {
    return {
      options: {
        sources:[{
          type:'video/youtube',
          src: 'https://www.youtube.com/watch?v=Tf1DEI2lEe0&t=2376s'
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