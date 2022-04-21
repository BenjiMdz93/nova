const { MessageEmbed } = require("discord.js")
const db = require('old-wio.db');

module.exports = {
    config: {
        name: "unmute",
        aliases: ["um"],
        category: 'mod',
        description: "Démute un membre dans le discord!",
        usage: "[name | nickname | mention | ID] <raison> (optionel)"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**Vous n'avez pas les autorisations pour mettre démute quelqu'un!**");

        if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("**Je n'ai pas la permission de démute quelqu'un!**")
        if (!args[0]) return message.channel.send("**Veuillez entrer un utilisateur!**")
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!mutee) return message.channel.send("**Veuillez entrer un utilisateur valide!**");

        let reason = args.slice(1).join(" ");

        let muterole;
        let dbmute = await db.fetch(`muterole_${message.guild.id}`);
        let muteerole = message.guild.roles.cache.find(r => r.name === "muted")

        if (!message.guild.roles.cache.has(dbmute)) {
            muterole = muteerole
        } else {
            muterole = message.guild.roles.cache.get(dbmute)
        }
      
        let rolefetched = db.fetch(`muteeid_${message.guild.id}_${mutee.id}`)
        if (!rolefetched) return;

        if (!muterole) return message.channel.send("**Ce membre n'était pas mute !**")
        if (!mutee.roles.cache.has(muterole.id)) return message.channel.send("**Ce membre n'est pas mute**")
        try {
        mutee.roles.remove(muterole.id).then(() => {
            mutee.send(`**Tu as démute ${message.guild.name} pour ${reason || "sans raison"}**`).catch(() => null)
            let roleadds = rolefetched
            if (!roleadds) return;
            mutee.roles.add(roleadds)
        })
        } catch {
            let roleadds2 = rolefetched
            if (!roleadds2) return;
            mutee.roles.add(roleadds2)                            
          }
            const sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${mutee.user.username} a été unmute avec succès.`)
            message.channel.send(sembed);
        

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
            .setColor("RED")
            .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("**Modération**", "unmute")
            .addField("**Unmute**", mutee.user.username)
            .addField("**Modérateur**", message.author.username)
            .addField("**Raison**", `${reason || "**Sans raison**"}`)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)

    }
}