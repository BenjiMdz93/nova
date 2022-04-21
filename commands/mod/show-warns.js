const db = require("old-wio.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
  name: "show-warns",
  aliases: ["warnings"],
  description: "Regardez vos avertissements ou ceux de la personne mentionnée",
  category: "mod",
  },
  run: (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(
      new MessageEmbed()
      .setDescription("Vous n'avez pas de droits de modération pour utiliser cette commande.")
      .setFooter("BAN_MEMBERS")
      .setColor(Color)
      );
    const user = message.mentions.members.first() || message.author
    
  
    let warnings = db.fetch(`warnings_${message.guild.id}_${user.id}`)
    
    
    if(warnings === null) warnings = 0;
    
    
    message.channel.send(`${user} a **${warnings}** warns`)
  
  
  }
}