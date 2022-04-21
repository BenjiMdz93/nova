const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json');
const axios = require('axios');

module.exports = {
    config: {
        name: 'binary',
        description: 'Affiche votre texte en format binaire',
        aliases: ["binary"],
        usage: '<texte>',
        category: 'fun',
    },
    run: async (bot, message, args) => {
        
        const url = `http://some-random-api.ml/binary?text=${args}`;

  let response, data;
  try {
    response = await axios.get(url);
    data = response.data;
  } catch (e) {
    return message.channel.send(`Une erreur s'est produite, veuillez réessayer!`);
  }

  const embed = new MessageEmbed()
    .setTitle("Texte en binaire")
    .setThumbnail(
      "https://png.pngtree.com/png-clipart/20200225/original/pngtree-binary-code-and-magnifying-glass-isometric-icon-png-image_5252004.jpg"
    )

    .setDescription("**Binary Code** - `" + data.binary + "`")
    .setTimestamp()
    .setColor(config.embedcolor);

  await message.channel.send(embed);

    }
};