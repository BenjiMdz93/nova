const { MessageEmbed } = require("discord.js");
module.exports = {
  config: {
    name: "roledel",
    category: 'mod',
    description: "Retirer un rôle à un membre",
    usage: "-roledel <member mention/member id> <role mention/role id>",
    aliases: ['role del', 'role delete', 'rdel']
  },
  run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.channel.send("Vous n'avez pas la permission d'exécuter cette commande !")

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.channel.send("Veuillez fournir un utilisateur à qui retirer un rôle.")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.channel.send("Veuillez fournir un rôle à retirer à cet utilisateur.") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("Je n'ai pas la permission d'exécuter cette commande. Veuillez me donner l'autorisation de gérer les rôles !")

    if(!rMember.roles.cache.has(role.id)) {
      let rolDEL_err = new MessageEmbed()
      .setColor(`#FF0000`)
      .setDescription(`Erreur ❌ | ${rMember.displayName}, n'a pas ce rôle!`);

      return message.channel.send(rolDEL_err)
    
    } else {

      await rMember.roles.remove(role.id).catch(e => console.log(e.message))
      
      let rolDEL = new MessageEmbed()
      .setColor(`#00FF00`)
      .setDescription(`Succès ✅ | ${rMember} le rôle **${role.name} lui a été retiré**`)

      message.channel.send(rolDEL)
    
    }

  },
};
