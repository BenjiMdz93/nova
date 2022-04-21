const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "channelinfo",
        aliases: ['ci', 'channeli', 'cinfo'],
        category: "info",
        description: "Informations sur un salon",
        usage: "[ channel mention | channel name | ID] (optional)",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.channel.send("**Salon introuvable!**");

        let channelembed = new MessageEmbed()
            .setTitle(`Informations du salon ${channel.name}`)
            .setThumbnail(message.guild.iconURL())
            .addField("**NSFW**", channel.nsfw, true)
            .addField("**ID**", channel.id, true)
            .addField("**Type**", channel.type)
            .addField("**Description**", `${channel.topic || "Pas de Description"}`)
            .addField("**Salon crée le**", channel.createdAt)
            .setColor("GREEN")
        message.channel.send(channelembed);
    }
}