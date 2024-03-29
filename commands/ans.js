const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
  const member = message.guild.members.get(args[0]);
  console.log(member);

  if (message.author.id !== "302901933419790347")
    return message.channel.send(
      ":x: Seul le créateur du bot peut utiliser cette commande !"
    );
  if (!args[0])
    return message.reply(
      "vous devez préciser une ID ! Syntaxe : <ans [id] [message]"
    );
  if (isNaN(args[0])) return message.reply("l'ID est invalide. ");

  const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setTitle(`${message.author.tag} (ID : ${message.author.id})`)
    .setColor("#0099ff")
    .setDescription(args.join(" ").slice(19))
    .setFooter(
      `Message envoyé à ${member.user.tag}`,
      `${member.user.displayAvatarURL}`
    )
    .setTimestamp();

  try {
    await member.send(embed);
    message.author.send(embed);
  } catch (e) {
    message.author.send(
      "L'utilisateur a désactivé ses messages privés, le message ne lui a donc pas été envoyé."
    );
  }
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["answer", "rep"],
  permLevel: 0
};

module.exports.help = {
  name: "ans"
};
