import { Telegraf } from "telegraf";
import { commandParser } from "@/utils";

const COMMANDS = {
	PLAY: 'PLAY',
	PAUSE: 'PAUSE',
	RESUME: 'RESUME',
	SKIP: 'SKIP'
}

/**
 * @typedef {Object } handlers
 * 
 * @property {Function} onplay
 * @property {Function} onpause
 * @property {Function} onresume
 * @property {Function} onskip
 */
class TelegramWorker {
	
	/**
	 * 
	 * @param {String} apiToken API Token for telegram bot
	 * @param {handlers} handlers Object with event handlers
	 */
	constructor (apiToken, handlers) {
		this.bot = new Telegraf(apiToken);
		this.bot.launch();
		this.bot.on("text", this.commandHandler.bind(this));

		this.handlers = handlers;
	}

	commandHandler(context) {
		const handlers = {
			[COMMANDS.PAUSE]: this.handlers.onpause,
			[COMMANDS.SKIP]: this.handlers.onskip,
			[COMMANDS.RESUME]: this.handlers.resume,
			[COMMANDS.PLAY]: this.handlers.onplay,
		}
		try {
			const { command, payload } = commandParser(context.update.message.text);
			handlers[command.toUpperCase()](payload);
		} catch (error) {
			//TODO: ВЫКИДЫВАТЬ ОШИБКУ В ЧАТ В ТЕЛЕГРАМЕ
			// https://github.com/Iinpark/z_music/projects/1#card-83426720
			console.log(error);
		}
	}
}

export default TelegramWorker;
