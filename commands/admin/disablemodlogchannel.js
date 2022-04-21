const db = require('old-wio.db');

module.exports = {
    config: {
        name: "disablemodlogchannel",
        aliases: ['dmc', 'disablem', 'disablemodlog'],
        category: 'admin',
        description: 'Désactiver le salons des logs',
        usage: '[nom du salon | #salon | ID du salon]',
        accessableby: 'Administrators'
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Vous n'avez pas la permission requise! - [ADMINISTRATEUR]**")

        try {
            let a = db.fetch(`modlog_${message.guild.id}`)

            if (!a) {
                return message.channel.send("**Il n'y a pas de salon de logs activé!**")
            } else {
                let channel = message.guild.channels.cache.get(a)
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Salon de logs désactivé!**")
                db.delete(`modlog_${message.guild.id}`)

                message.channel.send(`**Le salon de logs de modération a bien été desactivé \`${channel.name}\`**`)
            }
            return;
        } catch {
            return message.channel.send("**Erreur - `Permission manquante ou salon inexistant`**")
        }
    }
}