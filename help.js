const fs = require('fs');
const { prefix } = require('./config.json')

module.exports = {
	name : "help", 
	description : "help",
	aliases: ["help"],
	execute(message=message, args=args, bot=bot, Discord=Discord) {
        var emojiForCategory = {
            "data": "🗄️",
            "fun": "🎮",
            "mod": "⚖️"
        }

        if(args[0] && args[0].toLowerCase() === 'owneronly-random') {
            message.channel.send("Lmao, these are only accessible to the owner. R u gud, or r u gud????");
            return;
        }

        const getDirectories = fs.readdirSync('./commands/', { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
        var commandFilesCategory = [];
        var commandFiles = [];

        if(!args[0]) {
            commandCategories(message, Discord)
        } else if(args[0] && getDirectories.includes(args[0].toLowerCase())){
            args[0] = getDirectories[getDirectories.indexOf(args[0].toLowerCase())];
            commandFilesCategory = fs.readdirSync(`./commands/${args[0]}/`).filter((file) => file.endsWith('.js'));
            let emoji = emojiForCategory[args[0]];
            commandsInCategory(message, Discord, args, commandFilesCategory, emoji);
        } else if(args[0]) {
            for(let dir of getDirectories) {
                commandFiles = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
                for (let file of commandFiles) {
                    const command = require(`./commands/${dir}/${file}`);

                    if(command.aliases.includes(args[0].toLowerCase())) {
                        individualCommand(message, Discord, command);
                        return;
                    }
                }
            }
        }
	}
};

function commandCategories(message, Discord) {
    const cmdCategory = new Discord.MessageEmbed()
    .setTitle('CBot Command Catagories')
    .setDescription("all the command categories for [CBot](https://github.com/jjoel1630/CBot)")
    .addFields(
        {
            name: `🗄️ Data`, value: `\`$help data\``, inline: true
        },
        {
            name: `🎮 Fun & Games`, value: `\`$help fun\``, inline: true
        },
        {
            name: `⚖️ Moderation`, value: `\`$help mod\``, inline: true
        },
        {
            name: `Having issues with the bot or want to suggest/contribute features?`, value: `Check out my [git-repo](https://github.com/jjoel1630/CBot)!`
        }
    )
    .setFooter(`The prefix for this bot is ${prefix}`)
    message.channel.send(cmdCategory);
}

function commandsInCategory(message, Discord, args, commandFilesCategory, emoji) {
    var alias =[];
    for(var i = 0; i < commandFilesCategory.length; i++) {
        // let a = commandFilesCategory[i].split('.');
        // a.splice(1, 1);
        // commandFilesCategory[i] = "`" + a.join() + "`";
        const commandAlias = require(`./commands/${args[0]}/${commandFilesCategory[i]}`)
        alias.push(`\`${commandAlias.aliases[0]}\``);
    }
    // commandFilesCategory.join(', ');
    args[0] = args[0].charAt(0).toUpperCase() + args[0].slice(1);
    const cmdCategory = new Discord.MessageEmbed()
    .setTitle(`${emoji} ${args[0]} Commands`)
    .setDescription("all the [CBot](https://github.com/jjoel1630/CBot) commands for this category")
    .addFields(
        {
            name: `${alias}`, value: `** **`
        },
        {
            name: `Having issues with the bot or want to suggest/contribute features?`, value: `Check out my [git-repo](https://github.com/jjoel1630/CBot)!`
        },
    )
    .setFooter(`The prefix for this bot is ${prefix}`);
    message.channel.send(cmdCategory);
}

function individualCommand(message, Discord, command) {
    const individualCommand = new Discord.MessageEmbed()
    .setTitle(`The ${command?.name} command`)
    .setDescription("all the [CBot](https://github.com/jjoel1630/CBot) commands for this category")
    .addFields(
        {
            name: `Description`, value: `${command?.description}`
        },
        {
            name: `Command Usage`, value: `${command?.usage}`
        },
        {
            name: `Aliases`, value: `${command?.aliases.join(', ')}`
        },
        {
            name: `Perms`, value: `${command.perms ? command.perms : 'Anyone can run this command'}`
        },
    )
    .setFooter(`The prefix for this bot is ${prefix}`);
    message.channel.send(individualCommand);
}