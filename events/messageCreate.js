const client = require("../index");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
  
  
      // user permissions handler
  if (!message.member.permissions.has(command.userPerms || [])) {
    if(command.userPermError === null || command.userPermError === undefined) {
      return message.reply(`<:error:941004913822019634> You need  \`${command.userPerms}\` permissions to use this comand!`);
    } else {
      return message.reply(command.userPermError)
    }
  }



  // bot permissions handler
  if (!message.guild.me.permissions.has(command.botPerms || [])) {
  if(command.botPermError === null || command.botPermError === undefined) {
    return message.reply(
      `<:error:941004913822019634> Ups :/  I need \`${command.botPerms}\` premission|s to run this command correctly`
    );
 } else {
    return message.reply(command.botPermError)
  }
  }
  
  
  
    await command.run(client, message, args);
});
