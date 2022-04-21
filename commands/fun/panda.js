const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  config: {
  name: "panda",
  description: "Montre la photo d'un panda",
  category: "images",
  aliases: [""],
  usage: "panda",
  },
  
  run: async (bot, message, args) => {
  
    const res = await fetch('https://some-random-api.ml/img/panda');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle(`🐼 Panda !!! 🐼`)
    .setImage(img)
    .setFooter(`Demande de ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
    
  }
};