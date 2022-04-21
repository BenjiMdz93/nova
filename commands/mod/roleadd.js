const { MessageEmbed } = require("discord.js");
const { ownerID } = require("../../owner.json")
module.exports = {
  config: {
    name: "roleadd",
    category: 'mod',
    description: "Ajouter un rôle à un membre",
    usage: "-roleadd <mention/id> <role mention/role id>",
    aliases: ['role add', 'radd']
  },
  run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"]) && !ownerID.includes(message.author.id)) return message.channel.send("Vous n'avez pas la permission d'exécuter cette commande!")

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.channel.send("Veuillez fournir un utilisateur pour ajouter un rôle aussi.")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.channel.send("Veuillez fournir un rôle à ajouter à cet utilisateur.") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("Je n'ai pas la permission d'exécuter cette commande. Veuillez me donner l'autorisation de gérer les rôles!")

    if(rMember.roles.cache.has(role.id)) {
        
      return message.channel.send(`${rMember.displayName}, a déjà le rôle!`)
    
    } else {
        
      await rMember.roles.add(role.id).catch(e => console.log(e.message))
      
      message.channel.send(`${rMember.displayName}  a obtenu le rôle **${role.name}**`)
    
    }

  },
};