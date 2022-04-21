const Discord = require("discord.js")

module.exports = (client) => {
  const errChannel = "918911241840382022"

 process.on('unhandledRejection', (reason, p) => {

console.log(" [Anti-Crash] : : Unhandled Rejection/Catch")
console.log(reason, p)

const errEmbed = new Discord.MessageEmbed()
.setColor("RED")
.setTitle("NEW ERROR")
.setDescription("An error just occured in the bot console!**\n\nERROR:\n\n** ```" + reason + "\n\n" + p + "```")
.setTimestamp()
.setFooter("Anti-Crash System")
client.channels.cache.get(errChannel).send({embeds: [errEmbed] })

 })

  process.on('uncaughtException', (err, origin) => {

console.log(" [Anti-Crash] : : Uncaught Exception/Catch")
console.log(err, origin)

const errEmbed = new Discord.MessageEmbed()
.setColor("RED")
.setTitle("NEW ERROR")
.setDescription("An error just occured in the bot console!**\n\nERROR:\n\n** ```" + err + "\n\n" + origin + "```")
.setTimestamp()
.setFooter("Anti-Crash System")
client.channels.cache.get(errChannel).send({embeds: [errEmbed] })

 })

  process.on('uncaughtExceptionMonitor', (err, origin) => {

console.log(" [Anti-Crash] : : Uncaught Exception/Catch (MONITOR)")
console.log(err, origin)

const errEmbed = new Discord.MessageEmbed()
.setColor("RED")
.setTitle("NEW ERROR")
.setDescription("An error just occured in the bot console!**\n\nERROR:\n\n** ```" + err + "\n\n" + origin + "```")
.setTimestamp()
.setFooter("Anti-Crash System")
client.channels.cache.get(errChannel).send({embeds: [errEmbed] })

 })

  process.on('multipleResolves', (type, promise, reason) => {

console.log(" [Anti-Crash] : : Unhandled Rejection/Catch")
console.log(type, promise, reason)

const errEmbed = new Discord.MessageEmbed()
.setColor("RED")
.setTitle("NEW ERROR")
.setDescription("An error just occured in the bot console!**\n\nERROR:\n\n** ```" + type + "\n\n" + promise + "\n\n" + reason + "```")
.setTimestamp()
.setFooter("Anti-Crash System")
client.channels.cache.get(errChannel).send({embeds: [errEmbed] })

 })

}