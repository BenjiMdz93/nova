const db = require("old-wio.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name : 'removeafk',
    aliases: ["rafk"],
    category: "utility",
    description: "Supprime votre afk si vous en avez mis un.",
    usage: "rafk",
  },
    run : async(bot, message, args) => {
        const check = await db.fetch(`afk-${message.author.id}+${message.guild.id}`)
        if(check === true) {
          message.channel.send("Tu n'as pas été en afk jusqu'à maintenant");
        } else {
        const embed = new MessageEmbed()
        .setDescription(`Vous n'êtes plus en mode AFK`)
        .setColor("GREEN")
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
        .setTimestamp();
        message.channel.send(embed)                }
    }
};