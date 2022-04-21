const { MessageEmbed } = require('discord.js');
const db = require("old-wio.db");

module.exports = {
    config: {
        name: "warn",
        description: "warn members",
        category: 'mod',
        usage: "-warn <@membre> [raison]",
        aliases: []
    },
    run: async (bot, message, args) => {
        let warnPermErr = new MessageEmbed()
        .setTitle("**Erreur de permissions!**")
        .setDescription("**Désolé, vous n'avez pas l'autorisation d'utiliser ceci.! ❌**")
            if(!message.channel.permissionsFor(message.member).has(['MANAGE_MESSAGES'])) return message.channel.send(warnPermErr);
    
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!member) return message.reply("Veuillez mentionner un membre valide de ce serveur");
        
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "(Sans raison)";
            
            let warnings = await db.fetch(`warnings_${message.guild.id}_${member.id}`)
            
            if(warnings === 3) {
      return message.channel.send(`${member} a déjà atteint sa limite avec 3 avertissements`)
    }
    
    if(warnings === null) {
            
            db.set(`warnings_${message.guild.id}_${member.id}`, 1)
            
            member.send(`Tu as été warn par <${message.author.username}> pour cette raison: ${reason}`)
            .catch(error => message.channel.send(`Désolé <${message.author}> je n'ai pas pu warn ce membre. Cause : ${error}`));
            let warnEmbed = new MessageEmbed()
            .setTitle("**__Warn__**")
            .setDescription(`**<@${member.user.id}> a été warn par <@${message.author.id}>**`)
            .addField(`**Reason:**`, `\`${reason}\``)
            .addField(`**Action:**`, `\`Warn\``)
            .addField(`**Modérateur:**`, `${message.author}`)

            message.channel.send(warnEmbed).then(msg => msg.delete({
              timeout: 5000
            }));
    } else if (warnings !== null) {
      db.add(`warnings_${message.guild.id}_${member.id}`, 1)
      member.send(`Tu as été warn par <${message.author.username}> pour cette raison: ${reason}`)
            .catch(error => message.channel.send(`Désolé <${message.author}> Je n'ai pas pu le warn. Raison : ${error}`));
            let ddEmbed = new MessageEmbed()
            .setTitle("**__Warn__**")
            .setDescription(`**<@${member.user.id}> a été warn par <@${message.author.id}>**`)
            .addField(`**Raison:**`, `\`${reason}\``)
            .addField(`**Action:**`, `\`Warn\``)
            .addField(`**Modérateur:**`, `${message.author}`)

            message.channel.send(ddEmbed)
    }

    }
}