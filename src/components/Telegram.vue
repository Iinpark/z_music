<template>
  <div style="display: none"></div>
</template>

<script>
import { Telegraf } from "telegraf";
import { commandParser } from "@/utils";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      bot: {},
    };
  },
  methods: {
    ...mapActions(["ADD_SONG"]),
    init() {
      this.bot = new Telegraf(process.env.VUE_APP_BOT_TOKEN);
      this.bot.launch();
      this.bot.on("text", this.commandHandler);
    },
    addToPlaylist(link) {
      console.log("addToPlaylist", link);
      this.ADD_SONG(link);
    },
    resume(...args) {
      console.log("resume", args);
      this.$emit("player:resume");
    },
    pause(...args) {
      console.log("pause", args);
      this.$emit("player:pause");
    },
    commandHandler(context) {
      try {
        const { command, payload } = commandParser(context.update.message.text);
        switch (command) {
          case "play":
            this.addToPlaylist(payload);
            break;
          case "pause":
            this.pause();
            break;
          case "resume":
            this.resume();
            break;
          default:
            break;
        }
      } catch (error) {
        //TODO: ВЫКИДЫВАТЬ ОШИБКУ В ЧАТ В ТЕЛЕГРАМЕ
        console.log(error);
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>