const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "addrole",
    botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","MANAGE_ROLES"],
    userPermission: ["MANAGE_ROLES"],
 
  aliases: ["role", "P!role"],
  category: "moderation",
  description: "Add role to any user",
  run: async (client, message, args) => {
    
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!target) return message.channel.send({ embeds: [
        new MessageEmbed()
        .setColor( "428CCF")
     .setDescription(` Please mention vaild role\n *addrole <@user> <@role>\n *addrole <user id> <role id >`)
      ]});
    let arole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

    if (!arole)
return message.channel.send({ embeds: [
        new MessageEmbed()
        .setColor( "428CCF")
     .setDescription(` Please mention vaild role\n *addrole <@user> <@role>\n *addrole <user id> <role id >`)
      ]});
      
        if (arole.managed) return message.channel.send({ embeds: [
        new MessageEmbed()
        .setColor( "428CCF")
     .setDescription(` **Cannot Add That Role To The User check my role position**`)
      ]});
   /*    let member = message.client.user
let botRolePosition = member.roles.highest.position;
    let rolePosition = arole.position;
    let userRolePossition = message.member.roles.highest.position;

    if (userRolePossition <= rolePosition)
      return message.channel.send({ embeds: [
        new MessageEmbed()
        .setColor( "428CCF")
     .setDescription(` Failed to add the role to the user because your role is lower or same  position than the specified role.`)
      ]});

    if (botRolePosition <= rolePosition)
      return message.channel.send({ embeds: [
        new MessageEmbed()
        .setColor( "428CCF")
     .setDescription(`Failed to add the role to the user because my highest role is lower or same position than the specified role.`)
      ]});*/
      if (target.roles.cache.has(arole.id)) return message.channel.send({ embeds: [
        new MessageEmbed()
        .setColor( "428CCF")
     .setDescription(` User Already Has The Role! `)
     ]})
    
    let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
    let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });

    const embed = new MessageEmbed()

      .setColor("GREEN")
      .setDescription(
        `<:tick:942308854824316948>  changed role for ${target.user.username} added ${arole}`
      );

    await message.channel.send({ embeds: [embed] });

    target.roles.add(arole).catch(err => {})
  }
};