const Discord = require('discord.js');
const { Console } = require('console');

module.exports = {
    config: {
        name: "unlock",
        category: 'mod',
        description: "Déverouiller un salon",
        aliases: []
    },
    run: async (bot, message, args) => {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("**Permissions insuffisantes!**")
        .setDescription("**Désolé, vous n'avez pas l'autorisation d'utiliser cette commande! ❌**")
        
        if(!message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS") ) return message.channel.send(lockPermErr);

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });
        } catch (e) {
            console.log(e);
        }

        message.channel.send(`carré | Salon déverouillé!`);
    }
}