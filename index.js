//Packages / important modules
const Discord = require('discord.js');
const ms = require('ms');
const fs = require('fs');
const ytdl = require('ytdl-core');
const cheerio = require('cheerio');
const request = require('request');
const Duration = require('humanize-duration');
const config = require('./config.json');


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
			console.log(typeof(deletedMsg));
		}

		if(bot.aliases.get(cmd)) {
			const command = bot.commands.get(bot.aliases.get(cmd));
			command.execute(message, args, bot, Discord, Duration, cheerio); 
		} else {
			return;
		}
	}
});

bot.on("messageDelete", (message) => {
	console.log(message.content);
	if (message.author.bot) return;
	deletedMsg.delete('deleted msg');
	deletedMsg.set("deleted msg", {'message': message.content, 'author': message.author.tag, 'created': message.createdAt});
	console.log(deletedMsg.get('deleted msg'));
});

bot.login(config.token);
