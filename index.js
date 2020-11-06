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
const Embed = new Discord.MessageEmbed();

const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	bot.commands.set(command.name, command);
}


bot.on('ready', async () => {
	console.log('ACTIVE!');
});

bot.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	let args = message.content.substring(config.prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	if (command === 'ban') {
		bot.commands.get('ban').execute(message, args, bot);
	} else if (command === 'members') {
		bot.commands.get('members').execute(message, args, bot);
	} else if (command === 'cls') {
		bot.commands.get('cls').execute(message, args, bot);
	} else if (command === 'ctc') {
		bot.commands.get('ctc').execute(message, args, bot);
	} else if (command === 'cvc') {
		bot.commands.get('cvc').execute(message, args, bot);
	} else if (command === 'echo') {
		bot.commands.get('echo').execute(message, args, bot);
	} else if (command === 'g') {
		bot.commands.get('g').execute(message, args, bot);
	} else if (command === 'gg') {
		bot.commands.get('gg').execute(message, args, bot, Discord, Duration);
	} else if (command === 'help') {
		bot.commands.get('help').execute(message, args, Discord, Duration);
	} else if (command === 'i') {
		bot.commands.get('i').execute(message, args, cheerio);
	} else if (command === 'iq') {
		bot.commands.get('iq').execute(message, args, bot);
	} else if (command === 'kick') {
		bot.commands.get('kick').execute(message, args, bot);
	} else if (command === 'members') {
		bot.commands.get('members').execute(message, args, bot);
	} else if (command === 'pick') {
		bot.commands.get('pick').execute(message, args, bot, Discord);
	} else if (command === 'ping') {
		bot.commands.get('ping').execute(message, args, bot);
	} else if (command === 'pl') {
		bot.commands.get('pl').execute(message, args, bot);
	} else if (command === 'pm') {
		bot.commands.get('pm').execute(message, args, bot);
	} else if (command === 'poll') {
		bot.commands.get('poll').execute(message, args, Embed);
	} else if (command === 'pp') {
		bot.commands.get('pp').execute(message, args, bot);
	} else if (command === 'spam') {
		bot.commands.get('spam').execute(message, args, bot);
	} else if (command === 'status') {
		bot.commands.get('status').execute(message, args, bot);
	} else if (command === 'simp') {
		bot.commands.get('simp').execute(message, args, bot);
	} 
});

bot.login(config.token);
