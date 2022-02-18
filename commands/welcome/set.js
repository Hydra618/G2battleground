const { MessageEmbed} = require("discord.js")
const db = require('quick.db')
module.exports = {
  name: "welcome", 
  run: async(client, message, args) => {
    let msg = message
   if (!message.member.permissions.has("ADMINISTRATOR")) {
      const embed2 = new MessageEmbed()
        .setColor("RED")
        .setDescription(
          "**You Dont Have Permission To User This Command. Required Permission** `ADMINISTRATOR`"
        );
      return message.channel.send({ embeds: [embed2] });
    }
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setColor("#00FF0")
        .setTitle("Server Welcome Setup")
        .setDescription("To use these commands, do `*welcome <command>`")
        .addField(
          "Commands Plugins",
          "`channel`, `message`, `messageremove`, `test`"
        )
        .setFooter(client.user.username + " | Welcome")
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    } else if (args[0].toLowerCase() === "channel") {
      //---------------------CHANNEL-----------------------------//
      let channel = msg.mentions.channels.first();
      if (!channel) {
        const emb = new MessageEmbed()
          .setColor("RED")
          .setTitle("❌  Channel Missing")
          .setDescription("Please Mention A Channel To Set As Welcome Channel!")
          .setTimestamp();
        return msg.channel.send({ embeds: [emb ]});
      } else {
        db.set(`welchannl1_${msg.guild.id}`, channel.id);
        const emb = new MessageEmbed()
          .setColor("#00FF00")
          .setDescription(`Welcome Channel Seted As ${channel}`)
          .setTitle(" ✅ Welcome Channel Seted")
          .setTimestamp();
        msg.channel.send({ embeds: [emb] });
        //-------------------CHANNL END-------------------------//
      }
  } else if (args[0].toLowerCase() === "message") {
      //------------------MESSAGE--------------------//
      let msg1 = args.slice(1).join(" ");
      if (!msg1) {
        return msg.channel.send({ embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setTitle("❌ Welcome Message Error")
            .setDescription("Please Specify A Message To Be Set In Welcome!")
            .addField(
              "Welcome Variables",
              `**{user}** - Mentions The User On Join.\n**{username}** - Member Username With Tag!\n**{server}** - Gives Server Name.\n**{membercount}** - Gets Server Member Count.\n**{:emoji}** - Show a server emoji by replacing with name. Ex. \`{:Alix}\``
            )
            .setFooter(client.user.username + ` |Welcome`)
            .setTimestamp()
        ] });
      } else {
        db.set(`welmsg1_${msg.guild.id}`, msg1);
        if (msg1) {
          msg1 = msg1.replace(/{user}/g, msg.author);
          msg1 = msg1.replace(/{server}/g, msg.guild.name);
          msg1 = msg1.replace(/{membercount}/g, msg.guild.memberCount);
          msg1 = msg1.replace(/{username}/g, msg.author.tag);
          let matches = msg1.match(/{:([a-zA-Z0-9]+)}/g);
          if(!matches) matches = msg1
          for (const match of matches) {
            const rep = await msg.guild.emojis.cache.find(
              (emoji) => emoji.name === match.substring(2, match.length - 1)
            );
            if (rep) msg1 = msg1.replace(match, rep);
          }
        }
        const emn = new MessageEmbed()
          .setColor("#00FF00")
          .setTitle("✅  Welcome Message Seted!")
          .addField("Welcome Message Seted As", msg1)
          .setFooter("This Are For Example!");
        msg.channel.send({ embeds: [emn] });
      }
      //--------------MESSAGE END---------------------//
    } else if (args[0].toLowerCase() === "messageremove") {
      let msg1 = db.get(`welmsg1_${msg.guild.id}`);
      if (msg1 == null) {
        return msg.channel.send({ embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setTitle(
              "❌ You Have Not Enable Welcome Message"
            )
            .setDescription("You Need To Enable Welcome Message To Disable")
            .setTimestamp()
        ] });
      } else {
        db.delete(`welmsg1_${msg.guild.id}`);
        const emb = new MessageEmbed()
          .setColor("#00FF00")
          .setTitle("✅  Disable Success")
          .setDescription("You Have Disable Welcome Message Succesfully")
          .setTimestamp();
        msg.channel.send({ embeds: [emb] });
      }
    }
}
}