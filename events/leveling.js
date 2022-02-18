const Levels = require('discord-xp');
const fs = require('fs')
const { MessageEmbed } = require('discord.js')
const {
    mongooseConnectionString
} = require("../config.json")
Levels.setURL(mongooseConnectionString);
const client = require('../index');
const db = require('quick.db')

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    const randomxp = Math.floor(Math.random() * 10) + 1; // this is the amoumt of xp it will give.. so it will give random number from 0 to 10 multiple by 10 and adding 1.. u can reduce this.. by changing the 12 to smth else..
    const hasLevelUp = await Levels.appendXp(message.author.id, message.guild.id, randomxp);
    if (hasLevelUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        const embed = new MessageEmbed()
        .setDescription(`Congratulations! <@${message.author.id}> You have reached level **${user.level}**.`)
        .setColor('#00ffff');  
        
      let datachan = db.get(`rankchan_${message.guild.id}`)
      if(!datachan) {
        message.channel.send({content: `<@${message.author.id}>`, embeds: [embed ]})
      }
      const channel = message.guild.channels.cache.get(datachan)
      channel.send({ embeds: [embed] })
      
                          const Level_Roles_Storage = fs.readFileSync('./roles.json')
                    const Level_Roles = JSON.parse(Level_Roles_Storage.toString())
                    
                    const Guild_Check = Level_Roles.find(guild => {
                        return guild.guildID === `${message.guild.id}`
                    })
                    if(Guild_Check) {
                
                    const Guild_Roles = Level_Roles.filter(guild => {
                        return guild.guildID === `${message.guild.id}`
                    })
                    //For Loop Works for Checking
                    for (let i = 0; i < Guild_Roles.length; i++) {
                        const user = await Levels.fetch(message.author.id, message.guild.id);
                        if(user.level == parseInt(Guild_Roles[i].Level_To_Reach)) {
                            const AuthorID = message.guild.members.cache.get(message.author.id);
                            const Given_Level_Role = Guild_Roles[i].Level_Role_ID
                            
                            return AuthorID.roles.add(Given_Level_Role)
                           .then(console.log('success'))
                        }
                    }
                    }
      
    }
})