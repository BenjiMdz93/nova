const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "poll",
        aliases: [""],
        description: "Faire un sondage",
        category: "utility",
        usage: "poll <question>",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("**Vous n'avez pas les permissions requises! - [Gérer le serveur]**");

        if (!args[0])
            return message.channel.send("**Entrez le texte du sondage!**");

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Sondage ${message.guild.name} `)
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setDescription(args.join(' '))
        var msg = await message.channel.send(embed);

        await msg.react('✅');
        await msg.react('❌');

        message.delete({ timeout: 1000 });
    }
}