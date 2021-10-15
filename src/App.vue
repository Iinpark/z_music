<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script>
const {Telegraf} = require('telegraf');
const BOT_TOKEN = '1760661141:AAE8nCW0gYYBZvqwS-rgiltBu4T1AppF8HE'

import MainPage from './pages/MainPage.vue';
export default {
  name: 'App',
  components: {
    MainPage
  },
  mounted() {
    const bot = new Telegraf(BOT_TOKEN)
    bot.launch()
    bot.command('play', console.log)
  }
}
</script>

<style>

</style>
