const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  message.delete();
  const { body } = await superagent.get("https://nekos.life/api/v2/img/pussy");

  const pEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("🍆 Random Pussy")
    .setImage(body.url);

  message.channel.send(pEmbed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: "pussy"
};
