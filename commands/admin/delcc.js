const db = require("quick.db");

module.exports = {
  config: {
  name: "delcc",
  aliases: ["d-cmd"],
  usage: "delcmd <nomdelacommande>",
  description: "Supprimer une commande customisée",
  category: "admin",
  },
  
  run: async (bot, message, args) => {

    let cmdname = args[0];

    if(!cmdname) return message.channel.send(":x: Donnez moi le nom de la commande, `delcmd <nomdelacommande>`")

    let database = db.fetch(`cmd_${message.guild.id}`)

    if(database) {
      let data = database.find(x => x.name === cmdname.toLowerCase())

      if(!data) return message.channel.send(":x: Commande introuvable.")

      let value = database.indexOf(data)
      delete database[value]

      var filter = database.filter(x => {
        return x != null && x != ''
      })

      db.set(`cmd_${message.guild.id}`, filter)
      return message.channel.send(`Supprimer la commande **${cmdname}** !`)


    } else {
      return message.channel.send(":x: Sorry but i am unable to find that command!")
    


  }
  }
}