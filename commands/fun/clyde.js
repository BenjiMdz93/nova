const Discord = require('discord.js');
const config = require('../../config.json');
const { MessageAttachment } = require('discord.js')
const fetch = require('node-fetch');

module.exports = {
    config: {
        name: 'clyde',
        description: "Affiche votre texte comme le message de Clyde.",
        aliases: ["clyde"],
        usage: '<text>',
        category: 'fun',
    },
    run: async (bot, message, args) => {
    
        const text = args.slice().join(' ');
		if (!text) {
			return message.channel.send(
				'❎ Veuillez fournir un texte valide.',
			);
		}

		const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send("❎ Une erreur s'est produite, veuillez réessayer !");
		}
		const attachment = new MessageAttachment(response.message, 'clyde.png');
		return message.channel.send(attachment);
  
    }
};