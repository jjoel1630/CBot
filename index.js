//Packages / important modules
const Discord = require('discord.js');
const ms = require('ms');
const fs = require('fs');
const ytdl = require('ytdl-core');
const cheerio = require('cheerio');
const request = require('request');
const Duration = require('humanize-duration');
const config = require('./config.json');
const help = require('./commands/help');

//clients
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
const Embed = new Discord.MessageEmbed();
deletedMsg = new Map();

const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));
for (let file of commandFiles) {
	const command = require(`./commands/${file}`);

	bot.commands.set(command.name, command);

	if(command.aliases && Array.isArray(command.aliases)) {
		command.aliases.forEach(alias => bot.aliases.set(alias, command.name))
	}
}

bot.on('ready', async () => {
	console.log('ACTIVE!');
});

bot.on('message', message => {
	if(message.content==='stop the cap' || message.content==='cap') {
		message.channel.send('https://www.youtube.com/watch?v=mugRenBeRw0&ab_channel=BruhCentralMoments')
	} else {
		if (!message.content.startsWith(config.prefix) || message.author.bot) return;

		let args = message.content.substring(config.prefix.length).split(' ');
		const cmd = args.shift().toLowerCase();

		if(cmd == 'snipe') {
			dmessage = deletedMsg.get('deleted msg').dcontent;
			dauthor = deletedMsg.get('deleted msg').person;
			dcreated = deletedMsg.get('deleted msg').created;
			const DEmbed = new Discord.MessageEmbed()
			.setTitle('Last Deleted Message')
			.addFields( 
				{
					name: `Message content`, value: `${dmessage}`
				},
				{
					name: `Author`, value: `${dauthor}`
				},
				{
					name: `Created at`, value: `${dcreated}`
				},
			)
			.setThumbnail(message.author.avatarURL());
			message.channel.send(DEmbed);
		} else {
			if(bot.aliases.get(cmd)) {
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
	console.log(message.content);
	console.log(message.author.author.tag);
	deletedMsg.set("deleted msg", {'dcontent': message.content, 'person': message.author.tag, 'created': message.createdAt});
});

bot.login(config.token);
