module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES")) {
    return message.reply(
      "Vous n'avez pas les permissions pour exécuter cette commande !"
    );
  }

  message.delete();
  const mentionned = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );

  if (!mentionned) {
    return message.channel.send(
      "L'utilisateur n'existe pas ou vous n'avez mentionner aucun utilisateur !"
    );
  }

  if (!args.join(" ").slice(22))
    return message.reply("Veuillez préciser un rôle existant");

  const role = message.guild.roles.find(
    r => r.name === args.join(" ").slice(22)
  );

  if (!role) return message.reply("Ce rôle n'existe pas");
  /*if (mentionned.hasRole(r => r.name === role))
    return message.channel.send(
      `${mentionned} a déjà ce rôle, on ne peux pas le lui ajouter`
    );*/ else {
    const roleChannel = message.guild.channels.find(
      c => c.name === "logs" || c.name === "👮rapport"
    );

    if (!roleChannel) {
      message.channel
        .send(":x: Channel **'logs'** introuvable.")
        .then(msg => msg.delete(3000));

      await wait(3500);

      const m = await message.channel.send("Création du channel **'logs'**...");

      setTimeout(() => {
        message.guild.createChannel("logs", "text", [
          {
            id: message.guild.id,
            deny: ["SEND_MESSAGES", "ADD_REACTIONS"],
            allow: ["READ_MESSAGE_HISTORY", "VIEW_CHANNEL"]
          }
        ]);
        m.edit("✅ Channel **'logs'** créé avec succès !").then(msg =>
          msg.delete(3000)
        );
      }, 5000);
    }

    try {
      await mentionned.addRole(role.id);
      message.channel.send(`${mentionned} à bien reçu le rôle ${role} !`);
    } catch (e) {
      return message.channel.send(
        "Une erreur est survenue lors de l'ajout du rôle. Ceci est probablement dû aux manques de permissions (ça pourrait aussi être la hiérarchie des rôles)."
      );
    }
  }
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["arole"],
  permLevel: 0
};

module.exports.help = {
  name: "addrole"
};
