const db = require("old-wio.db");
const Discord = require ("discord.js")
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');
module.exports = {
config: {
  name: "botinfo",
  category: "info",
  aliases: ['binfo', 'botstats', 'stats'],
  description: 'Informations du bot',
},
  run: async (bot, message, args) => {
   message.delete();
      message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`${bot.user.username} v${version}`, bot.user.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .addField('❯ Temps de fonctionnement :', `${ms(bot.uptime)}`, true)
            .addField('❯ Ping:', `${bot.ws.ping}ms`, true)
            .addField('❯ Mémoire:', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, true)
            .addField('❯ Nombre de serveurs:', `${bot.guilds.cache.size} guilds`, true)
            .addField(`❯ Nombre d'utilisateurs:`, `${bot.guilds.cache.reduce((users , value) => users + value.memberCount, 0)} users`, true)
            .addField('❯ Nombre de commandes:', `${bot.commands.size} commandes`,true)
            .addField('❯ Node:', `${process.version} on ${process.platform} ${process.arch}`, true)
            .addField('❯ Cached Data:', `${bot.users.cache.size} users\n${bot.emojis.cache.size} emojis`, true)
            .addField('❯ Discord.js:', `${discordjsVersion}`, true)
            .setFooter(`Demandé ${message.author.username}`, message.author.displayAvatarURL({
              dynamic: true
            }))
            .setTimestamp()
        );
    }
}
