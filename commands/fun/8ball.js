const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
  name: "8ball",
  aliases: [" "],
  description: "L'occasion de poser des questions au bot!",
  category: "fun",
  usage: "8ball",
    },
  run: async (bot, message, args) => {
    let question = message.content.slice(bot.prefix + 6);
    if (!question)
      return message.channel.send(`La commande doit être accompagnée d'une question!`);
    else {
      let responses = [
       'Maybe.',
	'Certainement pas.',
	"Je l'espère.",
	'Pas dans vos rêves les plus fous.',
	'Il y a de fortes chances.',
	'Très probablement.',
	'Je pense que oui.',
	'Je pense que non.',
	"Je l'espère.",
	'Jamais!',
	'Ahaha! Vraiment?!?',
	'Pfft',
	'Désolé, bucko.',
	'Bon sang, oui.',
	'Bon sang, non.',
	"L'avenir est sombre.",
	"L'avenir est incertain",
	'Je préfère ne pas le dire.',
	"Qui s'en soucie ?",
	'Possiblement.',
	'Jamais, jamais, jamais.',
	'Il y a peu de chances',
	'OUI!'
      ];
      let response =
        responses[Math.floor(Math.random() * responses.length - 1)];
      let Embed = new MessageEmbed()
        .setTitle(`8Ball!`)
        .setDescription(`Ta question: ${question}\nMa réponse: ${response}`)
        .setColor(`RANDOM`);
      message.channel.send(Embed);
    }
  },
};