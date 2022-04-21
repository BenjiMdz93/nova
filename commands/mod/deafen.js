const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "deafen",
        category: 'mod',
        description: "Rendre sourt un membre dans un canal vocal",
        usage: "deafen <user>",
        aliases: ["deaf"]
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Vous n'avez pas la permission de rendre sourt un utilisateur! - [DEAFEN_MEMBERS]**");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Impossible de trouver l'utilisateur mentionné dans ce serveur.")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Sans raison";


        try {
            member.voice.setDeaf(true, reason);
            message.channel.send("Mise en sourdine d'un membre effectuée avec succès")
        } 
        
        catch(error) {
            console.log(error)
            message.channel.send("Oups ! Une erreur inconnue s'est produite. Veuillez réessayer plus tard.")
        }

    }
}