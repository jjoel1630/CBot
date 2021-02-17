const fs = require('fs');
const { get } = require('request');
const { prefix } = require('./config.json')

module.exports = {
	name : "help", 
	description : "help",
	aliases: ["help"],
	execute(message=message, args=args, bot=bot, Discord=Discord) {
        var commands = [];

        const getDirectories = fs.readdirSync('./commands/', { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
        
        if(!args[0]) {
            commandCategories();
        } else {
            return;
        }

        // for(let dir of getDirectories) {
        //     const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
        //     for (let file of commandFiles) {
        //         const command = require(`./commands/${dir}/${file}`);

        //         let aliases = command.aliases.splice(0).join(', ');
        //         let whole_command = `**${prefix}${aliases}** ${command.description}\n`

        //         commands.push(whole_command)
        //     }
        // }

        var formatted_commands = commands.splice(0).join(' ')
		const helpEmbed = new Discord.MessageEmbed()
            .setTitle('Commands')
			.addFields(
                {
                    name: `These are the cmds`, value: `${formatted_commands}`
                },
            )
			.setThumbnail(message.author.avatarURL());
		message.channel.send(helpEmbed);
	}
};

function commandCategories() {
    const cmdCategory = new Discord.MessageEmbed()
    .setTitle('CBot Command List')
    .setDescription("all the command categories for [CBot](https://github.com/jjoel1630/CBot)")
    .addFields(
        {
            name: `🗄️ Data`, value: `\`$help data\``
        },
        {
            name: `🎮 Fun & Games`, value: `\`$help fun\``
        },
        {
            name: `⚖️ Moderation`, value: `\`$help mod\``
        }
    )
    .setFooter('Having issues with the bot or want to suggest/contribute features? Check out my [git-repo](https://github.com/jjoel1630/CBot)')
    message.channel.send(cmdCategory);
}