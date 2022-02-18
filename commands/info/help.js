var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = "*"
const db = require('quick.db')

module.exports = {
    name: "help",
    description: "Help Menu",
    usage: "1) m/help \n2) m/help [module name]\n3) m/help [command (name or alias)]",
    example: "1) m/help\n2) m/help utility\n3) m/help ban",
    aliases: ['h'],
run: async (bot, message, args) => {
    var log = new Discord.MessageEmbed()
    .setColor(`GOLD`)
    .setAuthor("Help Menu")
    .addField(`<:mod:942305199333187635> ** ❯ MODERATION [2]**`,"`welcome`, `addrole`, `announce`")
    .addField(`<:level:942308356662652949> ** ❯ LEVELING [5]**`, "`add-level-role`, `remove-level-role`, `list-roles`, `rank`, `leaderboard`")
    .addField(`<:info:942308583540949063> ** ❯ UTILITY [3]**`,"`help`,`invite`,`stats`" )
    .setFooter("G2 Battleground")
    .setTimestamp()

message.channel.send({ embeds: [log] });
}
}