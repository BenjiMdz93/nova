const db = require('old-wio.db');

module.exports = {
    config: {
        name: "disablemuterole",
        category: 'admin',
        aliases: ['clearmuterole', 'dsr', 'desactivemr', 'drole'],
        description: 'Disables Server Mute Role',
        usage: '[role name | role mention | role ID]',
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Vous n'avez pas les permissions requises! - [ADMINISTRATEUR]**")

        try {
            let a = db.fetch(`muterole_${message.guild.id}`)

            if (!a) {
                return message.channel.send("**Il n'y a pas de muterole!**")
            } else {
                let role = message.guild.roles.cache.get(a)
                db.delete(`muterole_${message.guild.id}`)

                message.channel.send(`**\`${role.name}\` Désactivé avec succès.**`)
            }
            return;
        } catch {
            return message.channel.send("**Erreur - `Permissions manquantes ou rôle inexistant`**")
        }
    }
}