const ms = require("ms");
const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
          name: "slowmode",
          category: 'mod',
          description: "Définir le mode lent pour un salon!",
          aliases: ['sm']
    },
  run: async (bot, message, args) => {
  
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("Vous n'avez pas la permission **Gérer les salons**.!").then(m => m.delete({ timeout: 5000 }));

        if (!args[0]) return message.channel.send("Vous n'avez pas spécifié de cooldown! `Exemple : 5`").then(m => m.delete({ timeout: 5000}));

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'sans raison';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.channel.send('Le cooldown du salon est déjà désactivé').then(m => m.delete({ timeout: 5000 }));

            embed.setTitle('Cooldown désactivé')
                .setColor('#00ff00')
            return message.channel.setRateLimitPerUser(0, reason)

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send("le temps n'est pas valide, veuillez réessayer!").then(m => m.delete({ timeout: 5000 }));

        if (time >= 21600) return message.channel.send('La limite du cooldown est trop élevée, veuillez entrer une valeur inférieure à 6 heures..').then(m => m.delete({ timeout: 5000 }));

        if (currentCooldown === time) return message.channel.send(`Slowmode is already set to ${args[0]}`);

        embed.setTitle('Cooldown activé')
            .addField('Cooldown: ', args[0])
            .addField('Raison: ', reason)
            .setColor('#ff0000');

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

    }
};