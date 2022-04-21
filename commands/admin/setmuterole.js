const db = require("old-wio.db");

module.exports = {
  config: {
    name: "setmuterole",
    category: 'admin',
    aliases: ["setmute", "smrole", "smr"],
    description: "Définir un MuteRole!",
    usage: "[nomdurole | mention | roleID]",
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATEUR"))
      return message.channel.send(
        "**Vous n'avez pas les permissions requises! - [ADMINISTRATEUR]**"
      );
    if (!args[0]) {
      let b = await db.fetch(`muterole_${message.guild.id}`);
      let roleName = message.guild.roles.cache.get(b);
      if (message.guild.roles.cache.has(b)) {
        return message.channel.send(
          `**Le Muterole dans ce serveur est \`${roleName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Veuillez entrer un nom/ID!!**"
        );
    }

    let role =
      message.mentions.roles.first() ||
      bot.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send("**Veuillez entrer un nom/ID valide!**");

    try {
      let a = await db.fetch(`muterole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send(
          "**Ce rôle est déjà le MuteRole!**"
        );
      } else {
        db.set(`muterole_${message.guild.id}`, role.id);

        message.channel.send(
          `**\`${role.name}\` MuteRole correctement défini!**`
        );
      }
    } catch (e) {
      return message.channel.send(
        "**Erreur - `Permission manquante ou rôle inexistant!`**",
        `\n${e.message}`
      );
    }
  }
};
