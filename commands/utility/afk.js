const db = require('old-wio.db');
const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'setafk',
		aliases: ['afk'],
		description: 'Mettez vous ne afk dans le serveur',
		usage: 'setafk <raison>',
		category: 'utility'
	},
	run: async (bot, message, args) => {
		const content = args.join(' ');
		await db.set(`afk-${message.author.id}+${message.guild.id}`, content);
		await db.set(`aftime-${message.author.id}+${message.guild.id}`, Date.now());
		const embed = new MessageEmbed()
			.setDescription(`Vous êtes maintenant afk\n**Raison :** ${content}`)
			.setColor('GREEN')
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			);
		message.channel.send(embed);
	}
};
