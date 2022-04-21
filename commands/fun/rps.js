const Discord = require('discord.js');
const rps = ['scissors', 'rock', 'paper'];
const res = [`Scissors ✂️`, `Rock 🗿`, `Paper 🗞️`];
const config = require('../../config.js');

module.exports = {
  config: {
    name: "rps",
    category: "fun",
    aliases: [""],
    description: "Joue à pierre-papier-ciseaux avec le chien. !!",
    usage: `${config.PREFIX}!!rps pierre`,
},

    run: async (bot, message, args) => {
        let userChoice;
    if (args.length) userChoice = args[0].toLowerCase();
    if (!rps.includes(userChoice)) 
      return message.channel.send('Veuillez saisir "pierre, papier ou ciseaux".');
    userChoice = rps.indexOf(userChoice);

    const botChoice = Math.floor(Math.random()*3);
    let result;

    if (userChoice === botChoice) result = "C'est un match nul que personne ne gagne.";

    else if (botChoice > userChoice || botChoice === 0 && userChoice === 2) result = `**${bot.user.username}** Wins`;
    else result = `**${message.member.displayName}** C'est une belle victoire, mon pote. !!`;

    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.member.displayName} vs ${bot.user.username} **RPS**`)
      .addField(`${message.member   .displayName}`, res[userChoice], true)
      .addField(`${bot.user.username}`, res[botChoice], true)
      .addField('Résultats', result)
      .setFooter(`Défié par ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}