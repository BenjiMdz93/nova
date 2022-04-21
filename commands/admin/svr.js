const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
          name: "svr",
          description: "Définir la région du serveur! \nAvailable Server IDs: \nbz : Brazil, \nhk : HongKong, \nind : India, \njp : Japan, \nrus : Russia, \nsng : Singapore, \nsa : South Africa, \nsyd : Sydney, \nusc : US-Central, \nuse : US-East, \nuss : US-South, \nusw : US-West, \neur : Europe",
          usage: "+svr <region ID>",
          category: 'admin',
          example: "-svr jp",
          aliases: ['svr'],  
        
},
  run: async (bot, message, args) => {
  
    if (!message.member.hasPermission("MANAGE_GUILD") && !ownerID.includes(message.author.id)) return message.channel.send("Permission insuffisante!- [Gérer le serveur]");

    let serverRegion = args.slice(0).join(' ');
    
    var availableRegions = ['bz', 'hk', 'jp', 'rus', 'sng', 'sa', 'syd', 'ind', 'usc', 'use', 'usw', 'uss', 'eur'];
    
    if(!serverRegion) {
      message.channel.send(`\n**Available IDS - **\n${availableRegions}`)
    }

    if(availableRegions.includes(serverRegion)) {
      try {
        const serverAliases = {
          'bz' : "brazil",
          'hk' : "hongkong",
           'ind' : "india",
          'jp' : "japan",
           'rus' : "russia",
           'sng' : "singapore",
          'sa' : "southafrica",
           'syd' : "sydney",
           'usc' : "us-central",
           'use' : "us-east",
           'uss' : "us-south",
           'usw' : "us-west",
           'eur' : "europe"
         }
        await message.guild.setRegion(serverAliases[serverRegion])
        message.channel.send(`Carré ✅ | Région du serveur changée pour ${serverAliases[serverRegion]}`)
        
      }

      catch(error) {
        console.log(error)
        message.channel.send(`Oups ❌ | Erreur detectée`)
      }
    }

  },
};