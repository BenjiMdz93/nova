const Discord = require('discord.js')

module.exports = {
    config: {
        name: "lockdown",
        category: 'mod',
        description: "Fermer le serveur",
        aliases: []
    },
    run: async (bot, message, args) => {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("**Erreur de permission!**")
        .setDescription("**Désolé, vous n'avez pas l'autorisation d'utiliser ceci.! ❌**")
        
        if(!message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS") ) return message.channel.send(lockPermErr);
        
        if(!args[0]) {
        return message.channel.send("Veuillez préciser quelque chose. `Soit on/off`.")
        };

        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
            })
            
            let lockEmbed = new Discord.MessageEmbed()
                
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
                .setDescription(`**\n\nDone! Entièrement fermé! 🔒**`)
                .setColor('#2F3136')
            return message.channel.send(lockEmbed);

        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                })
            })
            
            let lockEmbed2 = new Discord.MessageEmbed()
                .setColor('#2F3136')    
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
                .setDescription(`**\n\nDone! Serveur ouvert! 🔓**`)
            return message.channel.send(lockEmbed2)
        }
    }
}
