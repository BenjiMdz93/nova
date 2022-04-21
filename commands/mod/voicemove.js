const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "vcmove",
        category: 'mod',
        description: "Faire changer de salon vocal un membre",
        usage: "vcmove <membre> <salon>",
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("MOVE_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Tu n'as pas la permission de faire changer de salon vocal un membre ! **");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Impossible de trouver l'utilisateur mentionné dans ce serveur.")

        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!channel.type === "voice") return message.channel.send("Impossible de localiser le salon vocal. Assurez-vous de mentionner un salon vocal et non un salon textuel !") 

        try {
            member.voice.setChannel(channel);
            message.channel.send("Succès ✅ : Membre Déplacé!")
        } 
        
        catch(error) {
            console.log(error);
            message.channel.send("Oups ! Une erreur inconnue s'est produite. Veuillez réessayer plus tard.")
        }

    }
}