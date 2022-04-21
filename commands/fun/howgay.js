const db = require("old-wio.db");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
  name: "howgay",
  aliases: [""],
  category: "fun",
  description: "Montre à quel point un membre est gay!",
  usage: "howgay <Mention>",
  },
  run: async (bot, message, args) => {
    //Start

    let Member =
      message.mentions.users.first() ||
      message.guild.member(args[0]) ||
      message.author;

    let Result = Math.floor(Math.random() * 101);

    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`A propos de votre homosexualité`)
      .setDescription(`${Member.username} est ${Result}% Gay 🏳️‍🌈`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
 
