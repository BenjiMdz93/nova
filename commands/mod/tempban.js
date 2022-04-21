const db = require("old-wio.db");
const { MessageEmbed } = require("discord.js");
const moment = require('moment');
const ms = require('ms');
const discord = require("discord.js");

module.exports = {
  config: {
	name: "tempban",
	category: "mod",
	description: "Bannissement temporaire",
	aliases: ["tban"],
	usage: "tempban <@user> <tepse> <raison>",
},
	run: async (bot, message, args) => {
		const reason = args.splice(2).join(" ");
		const tbuser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		const regex = args.splice(1).join(" ");

		if (!message.member.hasPermission("BAN_MEMBERS")) {
			return message.channel.send("Je n'ai pas les autorisations exactes pour bannir quelqu'un");
		}
		if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
			return message.channel.send("Je n'ai pas le droit de bannir quelqu'un");
		}
		if(tbuser === message.guild.me) {
			return ("Pourquoi vous voulez me bannir!!");
		}
		if (!tbuser) {
			return message.channel.send("Vous devez spécifier un utilisateur ``@user``");
		}
		if (tbuser.id == message.author.id) {
			return message.channel.send("Vraiment ! Allez-vous vraiment vous bannir vous même...?");
		}
		if(tbuser.roles.highest.position >= message.member.roles.highest.position) {
			return("Vous ne pouvez pas bannir cette personne. Raison : plus hautes perms ou plus haut rôles.");
		}

		if(tbuser.id == message.guild.owner.id) {
			return message.channel.send("Je pense que tu peux bannir le propriétaire du serveur...");
		}
		if(!reason) reason = "Sans raison spécifiée";
		
		const tbuembed = new MessageEmbed()
			.setTitle("Vous avez été banni!")
			.setColor("#854ae3")
			.addField("Raison:", reason)
			.addField("Temps (s)", regex)
			.addField("Modérateur:", message.author.username);
		tbuser.send(tbuembed);
		const tbembed = new MessageEmbed()
			.setTitle("Action: Tempban")
			.addField("Membre:", tbuser)
			.setAuthor(`${message.author.username}`)
			.setColor("#854ae3")
			.addField("Raison:", reason)
			.addField("Temps (s)", regex)
			.addField("Modérateur:", message.author.username);
		message.channel.send(tbembed);
		tbuser.send(tbuembed);
		
		tbuser.ban({reason: reason }).then(() => {
		  setTimeout( function (){
			message.guild.members.unban(tbuser.id);
			message.channel.send(`<@${tbuser.id}> a été débanni après le tempban de ${regex}`);
		}, ms(regex));
		return undefined;
	})
	}
}