const { stripIndents } = require('common-tags');
const { verify } = require('../../functions');
const db = require('old-wio.db');

module.exports = {
    config: {
        name: 'tictactoe',
        aliases: ['ttt', 'tictac'],
        category: 'fun',
        usage: '[name | nickname | mention | ID]',
        description: 'Jouer une partie de TicTacToe avec un autre utilisateur',
    },
    run: async (bot, message, args, ops) => {
        if (!args[0]) return message.channel.send('**Veuillez entrer un utilisateur!**')
        let opponent = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!opponent) return message.channel.send("**Veuillez entrer un utilisateur valide!**")
        if (opponent.user.bot) return message.channel.send('**Impossible de jouer contre des robots!**');
        if (opponent.user.id === message.author.id) return message.channel.send('**Vous ne pouvez pas jouer contre vous-même!**');
        const current = ops.games.get(message.channel.id);
        if (current) return message.channel.send(`**Veuillez attendre que le jeu actuel de \`${current.name}\` se termine!**`);
        ops.games.set(message.channel.id, { name: 'tictactoe' });
        try {
            await message.channel.send(`**${opponent}, Acceptez-vous ce défi ??**`);
            const verification = await verify(message.channel, opponent);
            if (!verification) {
                ops.games.delete(message.channel.id);
                return message.channel.send(`**On dirait que ${opponent} Ne veut pas jouer!**`);
            }
            const sides = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
            const taken = [];
            let userTurn = true;
            let winner = null;
			      let lastTurnTimeout = false;
            while (!winner && taken.length < 9) {
                const user = userTurn ? message.author : opponent;
                const sign = userTurn ? 'X' : 'O';
                await message.channel.send(stripIndents`
					**${user}, Quel côté choisissez-vous ? Tapez ``End`` pour déclarer forfait!**
					\`\`\`
					${sides[0]} | ${sides[1]} | ${sides[2]}
					—————————
					${sides[3]} | ${sides[4]} | ${sides[5]}
					—————————
					${sides[6]} | ${sides[7]} | ${sides[8]}
					\`\`\`
				`);
                const filter = res => {
                    if (res.author.id !== user.id) return false;
                    const choice = res.content;
                    if (choice.toLowerCase() === 'end') return true;
                    return sides.includes(choice) && !taken.includes(choice);
                };
                const turn = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 30000
                });
                if (!turn.size) {
                    await message.channel.send(`**Le temps est écoulé, le jeu est terminé!**`);
                    if (lastTurnTimeout) {
										  winner = 'time';
						          break;
					          } else {
						            userTurn = !userTurn;
						            lastTurnTimeout = true;
						            continue;
					          }
                 }
                const choice = turn.first().content;
                if (choice.toLowerCase() === 'end') {
                    winner = userTurn ? opponent : message.author;
                    break;
                }
                sides[Number.parseInt(choice, 10) - 1] = sign;
                taken.push(choice);
                if (verifyWin(sides)) winner = userTurn ? message.author : opponent;
              	if (lastTurnTimeout) lastTurnTimeout = false;
                userTurn = !userTurn;
            }
            db.add(`games_${opponent.id}`, 1)
      		  db.add(`games_${message.author.id}`, 1)
            ops.games.delete(message.channel.id);
            if (winner === 'time') return message.channel.send("**Fin du jeu pour cause d'inactivité!**");
            return message.channel.send(winner ? `**Félicitations, ${winner}!**` : "**C'est un match nul !**");
        } catch (err) {
            ops.games.delete(message.channel.id);
            throw err;
        }
        
        function verifyWin(sides) {
            return (sides[0] === sides[1] && sides[0] === sides[2])
                || (sides[0] === sides[3] && sides[0] === sides[6])
                || (sides[3] === sides[4] && sides[3] === sides[5])
                || (sides[1] === sides[4] && sides[1] === sides[7])
                || (sides[6] === sides[7] && sides[6] === sides[8])
                || (sides[2] === sides[5] && sides[2] === sides[8])
                || (sides[0] === sides[4] && sides[0] === sides[8])
                || (sides[2] === sides[4] && sides[2] === sides[6]);
        }
    }
};