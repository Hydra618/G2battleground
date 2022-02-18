const Levels = require('discord-xp');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'leaderboard',
    run: async (client, message, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5); // this will get the first 5 ppl
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
        if (rawLeaderboard.length < 1) return message.reply('Nobody is in the leaderboard');

    const l = leaderboard.map(e => `**\#${e.position}**・ **${e.username}#${e.discriminator}**\nLevel: \`${e.level}\`\nXP: \`${e.xp.toLocaleString()}\/${Levels.xpFor(Number(e.level + 1)).toLocaleString()}\``)

       
 if(l.length < 10) {
const embed = new MessageEmbed()
.setColor('#ffff00') 
.setTimestamp()
.setThumbnail(message.guild.iconURL({dynamic: true}))
.setDescription(`${l.join("\n\n")}`)
.setTitle(`Leaderboard for ${message.guild.name}`);
message.channel.send({ embeds: [embed] })
} else {
  let list = [];
   for (let i = 0; i < l.length; i += 10) {
      const items = l.slice(i, i + 10);
      list.push(items.join("\n"));
    }
    const symbols = ["⏮️","◀️","⏹️","▶️","⏭️","#️⃣"];
    let page = 0;

let e  = new MessageEmbed()
            .setAuthor(`${message.guild.name}\'s Rank Leaderboard`)
            .setColor("0x#FFFF00")
            .setDescription(list[page])
            .setThumbnail(message.guild.iconURL({dynamic: true}))
      .setFooter(`Page ${page +1 } of ${list.length}`)         //   .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .setTimestamp()
    const msg = await message.channel.send({ embeds: [e] });
    symbols.forEach(symbol => msg.react(symbol));
    let doing = true;
    while (doing) {
    let r;
    const filter = (r, u) => symbols.includes(r.emoji.name) && u.id == message.author.id;
    try { r = await msg.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] }) }
    catch { return message.channel.send("Command timed out.") }
    const u = message.author;
    r = r.first();

    if (r.emoji.name == "▶️") {
msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
if(page === list.length - 1) page = 0; 
      else { page++; }
    } else if (r.emoji.name == "◀️") {
msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
if(page === 0) page = list.length - 1;
      else {  page--;   }
   
      } else if(r.emoji.name === "⏮️") { 
page = 0;
msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
       
      } else if(r.emoji.name === "⏭️") { 
page = list.length - 1;
msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
      } else if (r.emoji.name == "⏹️" ) {
       msg.reactions.removeAll();
       return;
      } else if(r.emoji.name === '#️⃣') {
         let m = await message.channel.send("What page do you wish to go to?");
                let collected = await m.channel.awaitMessages(
                    response => message.content,
                    {
                        max: 1,
                        errors: ["time"]
                    }
                );
                try {
                    m.delete();
                    let content = parseInt(collected.first().content);
                    if (content && content > 0 && content <= list.length)
                        page = content - 1;
                } catch (err) {
                    console.log(err.message);
                    m.delete();
                }

        } 
let embed1 = new MessageEmbed()
             .setAuthor(`${message.guild.name}'s Rank Leaderboard`)
            .setColor("0x#FFFF00")
            .setDescription(list[page])
            .setThumbnail(message.guild.iconURL({dynamic: true}))
      .setFooter(`Page ${page + 1} of ${list.length}`)
      
         //   .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .setTimestamp()
await msg.edit({ embeds: [embed1] }).catch(error => console.error(error));

  }

}
} 
    
}