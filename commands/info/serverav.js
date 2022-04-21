const Discord = require("discord.js");

module.exports = {
  config: {
  name: "serverav",
  aliases: ["sav", "guildavatar", "servericon"],
  category: "info",
  description: "Obtenir l'avatar du serveur",
  usage: "servericon",
  },
  run: async (bot, message, args) => {
    
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Avatar pour ${message.guild.name}`, message.guild.iconURL({
      dynamic: true
    }))
    .setDescription(`**Télécharger l'avatar de ce serveur ici**\n[Click Here](${message.guild.iconURL({ dynamic: true, size: 1024 })})`)
    .setImage(message.guild.iconURL({ dynamic: true, size: 1024 }))
    .setColor("RANDOM");
    
      message.channel.send(embed)
    
  }
}