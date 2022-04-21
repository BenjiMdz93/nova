const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "status",
        category: "fun",
        aliases: [""],
        description: "Affiche le statut des utilisateurs",
        usage: "status <@user>",
    },
    run: async (bot, message, args) => {

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

        if (!user.presence.activities.length) {
            const sembed = new MessageEmbed()
                .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
                .setColor("GREEN")
                .setThumbnail(user.user.displayAvatarURL())
                .addField("**Pas de statut**","Cet utilisateur n'a pas de statut personnalisé!")
                .setFooter(message.guild.name, message.guild.iconURL())
                .setTimestamp()
            message.channel.send(sembed)
            return undefined;
        }

        user.presence.activities.forEach((activity) => {

            if (activity.type === 'CUSTOM_STATUS') {
                const embed = new MessageEmbed()
                    .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
                    .setColor("GREEN")
                    .addField("**Statut**", `**Statut personnalisé** -\n${activity.emoji || "Pas d'Emoji"} | ${activity.state}`)
                    .setThumbnail(user.user.displayAvatarURL())
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                message.channel.send(embed)
            }
            else if (activity.type === 'PLAYING') {
                let name1 = activity.name
                let details1 = activity.details
                let state1 = activity.state
                let image = user.user.displayAvatarURL({ dynamic: true })

                const sembed = new MessageEmbed()
                    .setAuthor(`${user.user.username}'s Activity`)
                    .setColor(0xFFFF00)
                    .setThumbnail(image)
                    .addField("**Type**", "Playing")
                    .addField("**App**", `${name1}`)
                    .addField("**Détails**", `${details1 || "No Details"}`)
                    .addField("**Working on**", `${state1 || "No Details"}`)
                message.channel.send(sembed);
            }
            else if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets !== null) {

                let trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`;
                let trackURL = `https://open.spotify.com/track/${activity.syncID}`;

                let trackName = activity.details;
                let trackAuthor = activity.state;
                let trackAlbum = activity.assets.largeText;

                trackAuthor = trackAuthor.replace(/;/g, ",")

                const embed = new MessageEmbed()
                    .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
                    .setColor("GREEN")
                    .setThumbnail(trackIMG)
                    .addField('Nom du son', trackName, true)
                    .addField('Album', trackAlbum, true)
                    .addField('Auteur', trackAuthor, false)
                    .addField('Écouter la piste', `${trackURL}`, false)
                    .setFooter(user.displayName, user.user.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed);
            }
        })
    }
}
