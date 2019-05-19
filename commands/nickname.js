module.exports.run = async (bot, message, args) => {
  message.delete();
  message.guild.members.get(args[0]).setNickname(args.join(" ").slice(19));
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["nick", "name"],
  permLevel: 0
};

module.exports.help = {
  name: "nickname"
};
