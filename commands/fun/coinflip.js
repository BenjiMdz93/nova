const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "coinflip",
        aliases: ['cf', 'coin', 'flip'],
        category: 'fun',
        description: 'tire à pile ou face',
        usage: 'coinflip',
    },
    run: async (bot, message, args) => {
        const n = Math.floor(Math.random() * 2);
        let result;
        if (n === 1) result = 'Face';
        else result = 'Pile';
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**${message.member.displayName} côté : ${result}**!`)
        message.channel.send(embed);
    }
};