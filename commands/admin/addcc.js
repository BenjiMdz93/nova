const db = require("quick.db");

module.exports = {
  config: {
  name: "addcc",
  aliases: ["a-cmd"],
  usage: "addcmd <nomdelacommande> <réponse>",
  description: "ajouter une commande customisée",
  category: "admin",
  },
  run: async (client, message, args) => {


    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Tu as besoin de la permission `Gérer les mesages` pour cette commande")

    let cmdname = args[0];

    if(!cmdname) return message.channel.send(`:x: Vous devez donner un nom pour cette commande, \`addcmd <nomdelacommande> <réponse>\`
    `);

    let cmdresponce = args.slice(1).join(" ");

    if(!cmdresponce) return message.channel.send(`:x: Vous devez indiquer la réponse à la commande, \-addcc <nomdelacommande> <réponse>`)

    let database = db.fetch(`cmd_${message.guild.id}`)

    if(database && database.find(x => x.name === cmdname.toLowerCase())) return message.channel.send(":x: Une commande à ce nom est déjà enregistrée.")

    let data = {
      name: cmdname.toLowerCase(),
      responce: cmdresponce
    }

    db.push(`cmd_${message.guild.id}`, data)

    return message.channel.send("La commande **" + cmdname.toLowerCase() + "** a été ajoutée a serveur.")


  }
}