const db = require("old-wio.db");

const { MessageEmbed } = require("discord.js");

const Discord = require("discord.js");

var pattern = new RegExp(
  "^(https?:\\/\\/)?" +
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
    "((\\d{1,3}\\.){3}\\d{1,3}))" +
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
    "(\\?[;&a-z\\d%_.~+=-]*)?" +
    "(\\#[-a-z\\d_]*)?$",
  "i"
);

module.exports = {
  config: {
    name: "say",
    aliases: ["broadcast"],
    description: "Dites votre message via le bot",
    category: "fun",
    usage: "say <input>",
  },
    run: async (bot, message, args) => {
    //Start

    message.delete();

    let Content = args.join(" ");

    if (!Content)
      return message.channel.send(`Donnez-moi quelque chose à dire!`);

    function UrlCheck(str) {
      return pattern.test(str);
    }

    if (UrlCheck(Content) === true) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(
          `Les liens ne sont pas autorisés | Seuls les administrateurs peuvent utiliser des liens`
        );
      }
    }

    return message.channel.send(Content);

    //End
  }
};
