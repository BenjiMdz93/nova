const Discord = require('discord.js');
const { Console } = require('console');

module.exports = {
    config: {
        name: "lock",
        category: 'mod',
        description: "Fermer un salon",
        aliases: []
    },
    run: async (bot, message, args) => {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("**Erreur d'autorisation de l'utilisateur!**")
        .setDescription("**Désolé, vous n'avez pas l'autorisation d'utiliser ceci.! ❌**")
        
        if(!message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS") ) return message.channel.send(lockPermErr);

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e);
        }

        message.channel.send(`Carré ! | Salon fermé!`);
    }
}