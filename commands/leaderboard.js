const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
  message.delete();

  const filtered = bot.points.filter(p => p.guild === message.guild.id).array();
  const sorted = filtered.sort((a, b) => a.points - b.points);
  const top10 = sorted.splice(0, 10).reverse();
  const embed = new Discord.RichEmbed()
    .setTitle("Leaderboard")
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setDescription("Voici le Top 10 des joueurs ayant le plus d'xp !")
    .setFooter(bot.user.username + " ©", bot.user.displayAvatarURL)
    .setColor("RANDOM");
  for (const data of top10) {
    embed.addField(
      bot.users.get(data.user).tag,
      `Niveau ${data.level} (${data.points} points)`
    );
  }
  return message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["lead", "lb"],
  permLevel: 0
};

module.exports.help = {
  name: "leaderboard"
};
