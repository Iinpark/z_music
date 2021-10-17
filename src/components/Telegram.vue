<template>
	<div style="display:none;"></div>
</template>

<script>
import {Telegraf} from 'telegraf'
import {commandParser} from '@/utils'

export default {
	data() {
		return {
			bot: {},
		}
	},
	methods: {
		init () {
			this.bot = new Telegraf(process.env.VUE_APP_BOT_TOKEN);
			this.bot.launch();
			this.bot.on('text', this.commandHandler)
		},
		commandHandler (context) {
			const { command, payload} = commandParser(context.update.message.text);
			switch (command) {
				case 'play':
					this.addToPlaylist(payload)
					break;
			
				default:
					break;
			}
		},
		addToPlaylist (link) {
			console.log('addToPlaylist', link);
			this.$emit('playlist:add', link)
		},
		resume (...args) {
			console.log('resume', args);
			this.$emit('player:play')
		},
		pause (...args) {
			console.log('pause',args);
			this.$emit('player:pause')
		}
	},
	mounted () {
		this.init()
	}
}
</script>