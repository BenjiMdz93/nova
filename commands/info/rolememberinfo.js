const { MessageEmbed } = require('discord.js');

module.exports = { 
        config: {
            name: "rolememberinfo",
            category: 'info',
            description: "Affiche la liste des membres ayant un rôle",
            usage: "m/rolememberinfo <role mention/role id>",
            aliases: ['rmi', 'rmemberinfo']
        },
        run: async (bot, message, args) => {
        if (args.includes("@everyone")) return;
        
        if (args.includes("@here")) return;

        if (!args[0]) return message.channel.send("**Veuillez entrer un rôle!**")

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!role) return message.channel.send("**Veuillez entrer un rôle valide!**");

        let membersWithRole = message.guild.members.cache.filter(member => {
            return member.roles.cache.find(r => r.name === role.name);
        }).map(member => {
            return member.user.username;
        })
        if (membersWithRole > 2048) return message.channel.send('**La liste est trop longue!**')

        let roleEmbed = new MessageEmbed()
            .setColor("#2F3136")
            .setThumbnail(message.guild.iconURL())
            .setTitle(`Utilisateurs avec le rôle ${role.name} !`)
            .setDescription(membersWithRole.join("\n"));
        message.channel.send(roleEmbed);
    }
}