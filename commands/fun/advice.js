const { MessageEmbed } = require('discord.js');
const Random = require("srod-v2")

module.exports = {
config: {
    name: 'advice',
    category: 'fun',
    description: 'Obtenir des conseils aléatoires',
    usage: 'advice',
    aliases: [''],
},
    run: async(bot, message, args) => {
        
        const Data = await Random.GetAdvice();
        return message.channel.send(Data);
    }
};