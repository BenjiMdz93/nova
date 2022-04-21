const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.js');

module.exports = {
  config: {
    name: "dog",
    aliases: ["doggy", "doggo", "puppy"],
    category: "images",
    description: "Envoie une photo de chien au hasard",
    usage: `${config.PREFIX}dog`,
},

    run: async (bot, message, args) => {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const img = (await res.json()).message;
        const embed = new Discord.MessageEmbed()
          .setTitle(`🐕 Dog 🐕`)
          .setImage(img)
          .setFooter(`Demande de ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);
    }
}