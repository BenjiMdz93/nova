const db = require("old-wio.db")

module.exports = {
    config: {
        name: "setmodlogchannel",
        category: "admin",
        aliases: ['setm', 'sm', 'smc', 'setmodlog'],
        description: "Définit un canal où le bot peut envoyer des logs de modération !",
        usage: "[#nomdusalon | ID du salon | nomdusalon]",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Vous n'avez pas les permissions requises! - [ADMINISTRATEUR]**")
    if (!args[0]) {
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `**Salon de logs de modération : \`${channelName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Veuillez metttre le nom/l'ID d'un salon!**"
        );
    }
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'text') return message.channel.send("**Veuillez entrer un salon valide!**");

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.channel.send("**Ce salon est déjà le salon des logs de modération!**")
            } else {
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Réglage du salon Modlog!**")
                db.set(`modlog_${message.guild.id}`, channel.id)

                message.channel.send(`**Salon des logs de modération : \`${channel.name}\`!**`)
            }
        } catch {
            return message.channel.send("**Error - Permission manquante ou salon inexistant!`**");
        }
    }
};