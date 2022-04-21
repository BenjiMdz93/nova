const { MessageEmbed } = require('discord.js');
const Random = require("srod-v2");

module.exports = {
config: {
    name: 'meme',
    category: 'fun',
    description: 'Obtenez des memes cool :)',
    usage: 'memes',
    aliases: [''],
},
    run: async(bot, message, args) => {
        let data = await Random.GetMeme();
        message.channel.send(data);
    }
};