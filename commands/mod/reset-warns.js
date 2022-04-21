const Discord = require("discord.js")
const { readdirSync } = require("fs");
const { OWNER_ID } = require("../../config");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "reloadmod",
        category: "owner",
        description: "k,j",
        aliases: ['rmod']
    },

    run: async (bot, message, args) => {
        if(message.author.id != OWNER_ID) {
          const rembed = new MessageEmbed()
          .setTitle("Error")
          .setDescription(":x: Vous n'êtes pas autorisé à utiliser cette commande car elle est réservée au propriétaire du serveur.")
          .setColor("#FF0000")
          .setFooter(message.author.username, bot.user.displayAvatarURL())
          .setTimestamp();
        message.channel.send(rembed).then(m => m.delete({
          timeout: 7500
        })
        );
        } else {
       
        if(!args[0]) return message.channel.send("")
        let commandName = args[0].toLowerCase()

        try {
          
          delete require.cache[require.resolve(`./${commandName}.js`)]
          const pull = require(`./${commandName}.js`)
          bot.commands.set(pull.config.name, pull)
          message.channel.send(`Rechargé avec succès : \`${commandName}\``)
        }

        catch (e) {
          console.log(e)
          return message.channel.send(`Impossible de recharger la commande: ${commandName} Du module de modération parce que: \n${e}`)
        }

}
      }
} 