const { MessageEmbed } = require('discord.js');
const db = require('old-wio.db');

module.exports = {
    config: {
        name: "setnick",
        aliases: ["sn", 'nick'],
        category: "mod",
        description: "Définir ou modifier le pseudonyme d'un utilisateur",
        usage: "[mention | name | nickname | ID] <nickname>",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**Vous n'avez pas le droit de changer de pseudonyme ! - [MANAGE_GUILD]**");

        if (!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send("**Je n'ai pas le droit de changer de pseudo! - [CHANGE_NICKNAME]**");
      
        if (!args[0]) return message.channel.send("**Veuillez entrer un utilisateur!**")
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("**Veuillez entrer un nom d'utilisateur!**");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Impossible de définir ou de modifier le pseudonyme de cet utilisateur!**')

        if (!args[1]) return message.channel.send("**Veuillez entrer un pseudonyme**");

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**Change le pseudo de ${member.displayName} vers ${nick}**`)
        message.channel.send(embed)
        } catch {
            return message.channel.send("**Permission manquante - [Gérer les pseudos]")
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Modération**", "setnick")
            .addField("**Nom changé de**", member.user.username)
            .addField("**Changé par**", message.author.username)
            .addField("**Changé pour**", args[1])
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(sembed)
    }
}