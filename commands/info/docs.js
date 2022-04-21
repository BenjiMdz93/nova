const db = require("old-wio.db");
const axios = require("axios");

module.exports = {
  config: {
  name: 'djsdocs',
  category: 'info',
  aliases: ["docs", "djs"],
  description: 'Affiche la documentation de Discord.JS',
  usage: "djsdocs <query>",
  },
  run: async (bot, message, args) => {
   const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      args
    )}`

    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed

        if (data && !data.error) {
          message.channel.send({ embed: data })
        } else {
          message.reply("Je n'ai pas trouvé cette documentation")
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}