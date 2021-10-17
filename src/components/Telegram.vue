<template>
	<div></div>
</template>

<script>
import Telegraf from 'telegraf'

export default {
	data() {
		return {
			bot: {},
		}
	},
	methods: {
		init () {
			const bot = new Telegraf(process.env.BOT_TOKEN);
			bot.connect();
		}
	}
}
</script>