//Packages / important modules
const Discord = require('discord.js');
const fs = require('fs');
const cheerio = require('cheerio');
const Duration = require('humanize-duration');
const config = require('./config.json');
const help = require('./help.js');
require('dotenv').config();

//clients
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
deletedMsg = new Map();

const getDirectories = fs.readdirSync('./commands/', { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
for(let dir of getDirectories) {
	const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
	for (let file of commandFiles) {
		const command = require(`./commands/${dir}/${file}`);

		bot.commands.set(command.name, command);

		if(command.aliases && Array.isArray(command.aliases)) {
			command.aliases.forEach(alias => bot.aliases.set(alias, command.name))
		}
	}
}

bot.on('ready', async () => {
	console.log('ACTIVE!');
});

bot.on('message', message => {
	if(message.content.toLowerCase() === 'stop the cap' || message.content.toLowerCase() === 'cap') {
		message.channel.send('https://www.youtube.com/watch?v=mugRenBeRw0&ab_channel=BruhCentralMoments')
		return;
	} else if(message.content.toLowerCase() === 'f') {
		message.channel.send('Lets get an F in the chat. F');
		return;
	} else if(message.content.startsWith('imagine')) {
		message.channel.send(`I can't even ${message.content}`);
		return;
	} else if(message.content.toLowerCase() === "gg") {
		var number = Math.floor(Math.random() * 4);
		switch(number) {
			case number === 0:
				message.channel.send("GG");
			case number === 1:
				message.channel.send("Good One");
			case number === 2:
				message.channel.send('Well played');
			case number === 3:
				message.channel.send('Good game');
			return;
		}
	} else {
		if (!message.content.startsWith(config.prefix) || message.author.bot) return;

		let args = message.content.substring(config.prefix.length).split(' ');
		const cmd = args.shift().toLowerCase();

		if(cmd === 'snipe') {
			try {
				var deletedMessage = deletedMsg.get('deleted msg').deletedContent;
				var deletedAuthor = deletedMsg.get('deleted msg').person;
				var deleteMessageCreateTime = deletedMsg.get('deleted msg').created;
				const DEmbed = new Discord.MessageEmbed()
				.setTitle('Last Deleted Message')
				.addFields( 
					{
						name: `Message content`, value: `${deletedMessage}`
					},
					{
						name: `Author`, value: `${deletedAuthor}`
					},
					{
						name: `Created at`, value: `${deleteMessageCreateTime}`
					},
				)
				.setThumbnail(message.author.avatarURL());
				message.channel.send(DEmbed);
			} catch(err) {
				message.channel.send('There is nothing to snipe');
			}
		} else {
			if(cmd === 'help') {
				help.execute(message, args, bot, Discord);
			} else if(bot.aliases.get(cmd)) {
				const command = bot.commands.get(bot.aliases.get(cmd));
				command.execute(message, args, bot, Discord, Duration, cheerio); 
			} else {
				return;
			}
		}
	}
});

bot.on("messageDelete", (message) => {
	if (message.author.bot) return;
	deletedMsg.set("deleted msg", {'deletedContent': message.content, 'person': message.author.tag, 'created': message.createdAt});
});

const token = process.env.token ? process.env.token : process.env.discord_bot_token;

// if(process.env.token) {
// 	token = process.env.token
// } else {
// 	token = process.env.discord_bot_token
// }

bot.login(token);
