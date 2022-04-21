const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const weather = require('weather-js');

module.exports = {
    config: {
        name: 'weather',
        description: 'Affiche les informations météorologiques',
        aliases: ["weather"],
        usage: '<city name>',
        category: 'fun',
    },
    run: async (bot, message, args) => {
    
        if(args.length === 0){
            let errorembed = new MessageEmbed()
            .setTitle("Erreur :cry:")
            .setDescription("Veuillez entrer un lieu!")
            .setColor(config.embedcolor)
            .setTimestamp();
                return message.channel.send(errorembed);
        }
        
        weather.find({ search: args.join(" "), degreeType: 'C'}, function(err, result) {
          
        if(result.length === 0){
            let errorembed = new MessageEmbed()
            .setTitle("Erreur :cry:")
            .setDescription("Veuillez entrer un lieu valide")
            .setColor(config.embedcolor)
            .setTimestamp();
                return message.channel.send(errorembed);
        }
        
          var current = result[0].current;
          var location = result[0].location;
            if (err) {
            let errorembed = new MessageEmbed()
            .setTitle("Erreur :cry:")
            .setDescription("Veuillez entrer un emplacement valide !")
            .setColor(config.embedcolor)
            .setTimestamp();
                return message.channel.send(errorembed);
            }
        
            
            let embed = new MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Météo pour ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(config.embedcolor)
            .addField('Fuseau horaire', `UTC${location.timezone}`, true)
            .addField('Type de degré', location.degreetype, true)
            .addField('Température', `${current.temperature} Degrés`, true)
            .addField('Température ressentie', `${current.feelslike} Degrés`, true)
            .addField('Vents', current.winddisplay, true)
            .addField('Humidité', `${current.humidity}%`, true)
            .setTimestamp();
                message.channel.send(embed);
        });
    }
};