const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "undeafen",
        category: 'mod',
        description: "Permettre à un membre d'entendre à nouevau dans un salon vocal",
        usage: "Undeafen <membre>",
        aliases: ["undeaf"]
       
    },

    run: async(bot, message, args) => {
     if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Vous n'avez pas la permission de retirer la sourdine d'un membre**");

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Impossible de trouver l'utilisateur mentionné dans cette guilde.")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Sans raison"


        try {
            member.voice.setDeaf(false, reason);
            message.channel.send("Succès ✅ : Sourdine retirée")
        } 
        
        catch (error) {
            console.log(error)
            message.channel.send("Oups ! Une erreur inconnue s'est produite. Veuillez réessayer plus tard.")
        }

    }
}