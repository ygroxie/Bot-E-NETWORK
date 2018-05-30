const Discord = require("discord.js");

var bot = new Discord.Client();

var prefix = ("?")

bot.on("ready", function() {
    bot.user.setGame("YgroxBot, ?help");
    console.log("Le bot a bien, était connecté !");
});

bot.on('message', function (message) {
    if (message.content === '?ping') {
        message.channel.send('pong !')
    }
});

bot.on('guildMemberAdd', member => {
    var role = member.guild.roles.find('name', 'Joueur');
    member.addRole(role)
})

bot.on('guildMemberAdd', member => {
    member.guild.channels.find("name", "bienvenue-aurevoir").send(`Bienvenue à toi ${member} sur le serveur de la GFX Communauté !`)
})

bot.on('guildMemberRemove', member => {

    member.guild.channels.find("name", "bienvenue-aurevoir").send(`Oh non ! ${member.user} vient de quitter le serveur !`)

})

bot.on('message',(message)=>{
    if(message.content == "?help") {
    var embed = new Discord.RichEmbed()
    .addField("?help","affiche les commandes du bot. ")
    .setColor("D7F705")
    .setTitle("Guide Commandes !")
    .setFooter ("(Utile si tu as courtes mémoire ! x) ")
    message.channel.send(embed)
    }
    })

bot.on('message', message => {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === "kick") {
        let modRole = message.guild.roles.find("name", "Modo");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permission de faire cette commande. Désolé !").catch(console.error);
        }
        if(message.mentions.users.size === 0) {
            return message.reply("Merci de mentionner l'utilisateur à expulser.").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply("Cet utilisateur est introuvable ou impossible à expulser")
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas la permission KICK_MEMBERS pour faire ceci.").catch(console.error);
        }
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} a été expulsé avec succès !`).catch(console.error);
            message.guild.channels.find("name", "bienvenue-aurevoir").send(`**${member.user.username} a été expulsé du discord par **${message.author.username}**`);
        }).catch(console.error)
        
}

if (command === "ban") {
    let modRole = message.guild.roles.find("name", "Modo");
    if(!message.member.roles.has(modRole.id)) {
        return message.reply("Tu n'as pas la permission de faire cette commande. Désolé !").catch(console.error);
    }
    const member = message.mentions.members.first();
    if (!member) return message.reply("Merci de mentionner l'utilisateur à bannir.");
    member.ban().then(member => {
        message.reply(`${member.user.username} a été bannu avec succès !`).catch(console.error);
        message.guild.channels.find("name", "bienvenue-aurevoir").send(`**${member.user.username}** a été banni du discord par **${message.author.username}**`);
    }).catch(console.error)
}})

bot.login(process.env.TOKEN)
