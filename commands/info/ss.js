const { Message, MessageEmbed } = require("discord.js");
//const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("old-wio.db");
const moment = require("moment");
const fetch = require("node-fetch");

const url = require("url");

module.exports = {
  config: {
  name: "ss",
  aliases: ["screenshot"],
  category: "info",
  description: "Effectue une capture d'écran de n'importe quelle page web.",
  usage: "screenshot <URL>",
  },
  run: async (bot, message, args) => {
   
    message.delete();
    const user = message.author.tag
    const urls = args[0];
    if (!urls)
      return message.channel
        .send(`\`\`\`\n${user},où est le lien -_-\n\`\`\``)
        .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
    
 if (urls.length < 8)
      return message
        .reply(
          "https est trop court pour faire un lien - 8 caractères minimum"
        )
        .then(m => m.delete({ timeout: 9000 }).catch(e => {}));
    
    message.channel.send("Attendez....").then(m => m.delete({
      timeout: 3000
    }).catch(e => console.log(e)));
    
    const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
    try {
      const { body } = await fetch(
        `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
      );

      return message.channel.send(
        `\`\`\`\nVoici une capture d'écran de l'URL demandée\n\`\`\``,
        {
          files: [{ attachment: body, name: "Screenshot.png" }]
        }
      );
    } catch (err) {
      if (err.status === 404)
        return message.channel
          .send("Impossible de trouver des résultats. URL non valide?")
          .then(m => m.delete({ timeout: 14000 }).catch(e => {}));
      return message
        .reply(`Oh non, une erreur s'est produite: \`${err.message}\`. Réessayez!`)
        .then(m => m.delete({ timeout: 13000 }).catch(e => {}));
    }
  }
};