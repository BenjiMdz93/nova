const db = require("old-wio.db");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  config: {
  name: "addemoji",
  aliases: ["upload_emoji", "a-emote"],
  description: "Prendre des emojis et les télécharger sur votre serveur.",
  usage: "addemoji <emoji>",
  category: "admin",
  },
  run: async (bot, message, args) => {
    
    if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
      return message.channel.send(`Vous n'avez pas la permission de gérer les émojis ! :x:`)
    }
    
    if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) { return message.channel.send(`Je n'ai pas la permission de gérer les émojis`)
    }
    
    const emoji = args[0];
    if (!emoji) return message.channel.send(`Veuillez me donner un émoji!`);

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");
      message.guild.emojis.create(
        `${Link}`,
        `${name || `${customemoji.name}`}`
      );
      const Added = new MessageEmbed()
        .setTitle(`Emoji ajouté`)
        .setColor(`RANDOM`)
        .setDescription(
          `L'émoji a bien été ajouté!\nName : ${name || `${customemoji.name}`}\nPreview : [Cliquer ici](${Link})`
        );
      return message.channel.send(Added);
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send(`Veuillez me donner un émoji valide! :x:`);
      message.channel.send(
        `You Can Use Normal Emoji Without Adding In Server!`
      );
    }
  }
};