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
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	let args = message.content.substring(config.prefix.length).split(' ');
	const cmd = args.shift().toLowerCase();

	const command = bot.commands.get(cmd)
	
	if(!command) return;
	
	command.execute(message, args, bot, Discord, Duration, cheerio); 
});

bot.login(config.token);
