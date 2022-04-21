const Discord = require("discord.js")
const moment = require('moment');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports = {
    config: {
        name: "whois",
        description: "userinfo",
        category: 'info',
        usage: "m/whois <mention a member/member id>",
        aliases: ['ui', 'userinfo']
    },
    run: async (bot, message, args) => {
        var permissions = [];
        var acknowledgements = 'None';
        let whoisPermErr = new Discord.MessageEmbed()
        .setTitle("**Erreur d'autorisation de l'utilisateur!**")
        .setDescription("**Désolé, vous n'avez pas l'autorisation d'utiliser ceci.! ❌**")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        

        if(member.hasPermission("KICK_MEMBERS")){
            permissions.push("Kick Members");
        }
        
        if(member.hasPermission("BAN_MEMBERS")){
            permissions.push("Ban Members");
        }
        
        if(member.hasPermission("ADMINISTRATOR")){
            permissions.push("Administrator");
        }
    
        if(member.hasPermission("MANAGE_MESSAGES")){
            permissions.push("Manage Messages");
        }
        
        if(member.hasPermission("MANAGE_CHANNELS")){
            permissions.push("Manage Channels");
        }
        
        if(member.hasPermission("MENTION_EVERYONE")){
            permissions.push("Mention Everyone");
        }
    
        if(member.hasPermission("MANAGE_NICKNAMES")){
            permissions.push("Manage Nicknames");
        }
    
        if(member.hasPermission("MANAGE_ROLES")){
            permissions.push("Manage Roles");
        }
    
        if(member.hasPermission("MANAGE_WEBHOOKS")){
            permissions.push("Manage Webhooks");
        }
    
        if(member.hasPermission("MANAGE_EMOJIS")){
            permissions.push("Manage Emojis");
        }
    
        if(permissions.length == 0){
            permissions.push("No Key Permissions Found");
        }
    
        if(member.user.id == message.guild.ownerID){
            acknowledgements = 'Server Owner';
        }
    
        const embed = new Discord.MessageEmbed()
            .setDescription(`<@${member.user.id}>`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('RANDOM')
            .setFooter(`ID: ${message.author.id}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField("__Statut__",`${status[member.user.presence.status]}`, true)
            .addField('__A rejoins le:__ ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
            .addField('__Compte crée le__', member.user.createdAt.toLocaleString(), true)
            .addField("__Joue à__", member.presence.activities[0] ? member.presence.activities[0].state : `L'utilisateur n'a pas de statut personnalisé!`, true)
            .addField(`\n__Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]__`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`, true)
            .addField("\n__Acknowledgements:__ ", `${acknowledgements}`, true)
            .addField("\n__Permissions:__ ", `${permissions.join(` | `)}`);
            
        message.channel.send({embed});
    
    }
    }
