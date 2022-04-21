const db = require('old-wio.db');
const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config.js');

module.exports = {
	config: {
		name: 'prefix',
		category: 'admin',
		description: "Changer/Savoir le préfix du serveur",
		usage: '-prefix <nouveau prefix/réinitialiser>',
		example: '1) !prefix = \n2) !prefix reset',
		aliases: ['prefix']
	},

	run: async (bot, message, args) => {
		let option = args[0];

		//PERMISSION
		if (!message.member.hasPermission('MANAGE_GUILD')) {
			return message.channel.send(
				"Vous n'avez pas la permission de changer le préfix"
			);
		}

		if (!option) {
			prefix = db.fetch(`prefix_${message.guild.id}`);
			if (!prefix) prefix = PREFIX;
			let prefEmbed = new MessageEmbed()
				.setColor('YELLOW')
				.setDescription(
					`**Mon préfix pour \`${message.guild.name}\`  est  **` +
						`  \`${prefix}\` \n**Type \`${prefix}help\` pour de l'aide**`
				);

			message.channel.send(prefEmbed);
		} else if (option.toLowerCase() === 'reset') {
			db.delete(`prefix_${message.guild.id}`);
			return await message.channel.send('Préfix réinitialisé ✅');
		} else if (args[1]) {
			return message.channel.send("Vous ne pouvez pas fixer le préfixe d'un double argument");
		} else if (args[0].length > 4) {
			return message.channel.send(
				'Vous ne pouvez pas envoyer de préfixe de plus de 4 caractères.'
			);
		} else if (args.join('') === PREFIX) {
			db.delete(`prefix_${message.guild.id}`);
			return await message.channel.send('Prefix réinitialisé ✅');
		} else {

		db.set(`prefix_${message.guild.id}`, args[0]);
		await message.channel.send(`Carré ✅ | Le préfix du bot est maintenant ${args[0]}`);
		}
	}
};
