const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
  message.delete();

  const top = bot.guilds
    .sort((a, b) => a.memberCount - b.memberCount)
    .array()
    .reverse()
    .splice(0, 10);

  var options = {
    maxAge: 3600,
    maxUses: 1
  };

  const Invit = new Array();
  top.forEach(async guild => {
    let channel;
    var index = 0;
    guild.channels.forEach(chan => {
      if (chan.type != "text") return;
      channel = chan;
      return;
    });
    const invite = await channel.createInvite(options);
    Invit.push(invite.code);
  });
  console.log(Invit);

  const embed = new Discord.RichEmbed()
    .setTitle(
      "Top 10 des serveurs avec le plus d'utilisateurs sur lesquels je me trouve !"
    )
    .setAuthor(bot.user.username + " ©", bot.user.displayAvatarURL)
    .setDescription(
      `● **${top[0].name}**\n  => **${
        top[0].memberCount
      }** users \n[[Rejoindre]]| (https://discord.gg/${Invit[0]})\n\n● **${
        top[1].name
      }**\n  => **${
        top[1].memberCount
      }** users \n[[Rejoindre]]| (https://discord.gg/${Invit[1]})\n\n● **${
        top[2].name
      }**\n  => **${
        top[2].memberCount
      }** users \n[[Rejoindre]]| (https://discord.gg/${Invit[2]})\n\n● **${
        top[3].name
      }**\n  => **${
        top[3].memberCount
      }** users \n[[Rejoindre]]| (https://discord.gg/${Invit[3]})\n\n● **${
        top[4].name
      }**\n  => **${
        top[4].memberCount
      }** users \n[[Rejoindre]]| (https://discord.gg/${Invit[4]})\n\n● **${
        top[5].name
      }**\n  => **${
        top[5].memberCount
      }** users \n[[Rejoindre]]| (https://discord.gg/${Invit[5]})\n\n● **${
        top[6].name
      }**\n  => **${
        top[6].memberCount
      }** users \n[[Rejoindre]]| (https://discord.gg/${Invit[6]})\n\n● **${
        top[7].name
      }**\n  => **${
        top[7].memberCount
      }** users \n[[Rejoindre]]| (https://discord.gg/${Invit[7]})\n\n● **${
        top[8].name
      }**\n  => **${
        top[8].memberCount
      }** users \n[[Rejoindre]]| (https://discord.gg/${Invit[8]})\n\n● **${
        top[9].name
      }**\n  => **${
        top[9].memberCount
      }** users \n[[Rejoindre]]| (https://discord.gg/${Invit[9]})\n`
    )
    .setFooter(bot.user.username + " ©", bot.user.displayAvatarURL)
    .setColor("RANDOM");

  return message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["topservers", "top"],
  permLevel: 0
};

module.exports.help = {
  name: "topguilds"
};
