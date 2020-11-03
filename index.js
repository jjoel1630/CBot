const Discord = require('discord.js');
const ms = require('ms');
const fs = require('fs');
const ytdl = require('ytdl-core');
const cheerio = require('cheerio');
const request = require('request');
const Duration = require('humanize-duration');
const config = require('./config.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const Embed = new Discord.MessageEmbed();

const token = 'NzcxNzY5NTI3NDU2ODkwODgw.X5w8Yg.VEJgHx5WqI4E4mnQdH7ACIlcaqU';
const PREFIX = '$';

var servers = {};

const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	bot.commands.set(command.name, command);
}

bot.on('ready', () => {
	console.log('ACTIVE!');
});

bot.on('message', (message) => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	let args = message.content.substring(PREFIX.length).split(' ');
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		bot.commands.get('ping').execute(message, args);
	} else if (command === 'g') {
		bot.commands.get('g').execute(message, args);
	} else if (command === 'cls') {
		bot.commands.get('cls').execute(message, args);
	} else if (command === 'pl') {
		bot.commands.get('pl').execute(message, args);
	} else if (command === 'welcome') {
		bot.commands.get('welcome').execute(message, args);
	} else if (command === 'poll') {
		bot.commands.get('poll').execute(message, args, Embed);
	} else if (command === 'i') {
		bot.commands.get('i').execute(message, args, cheerio, request);
	} else if (command === 'pick') {
		bot.commands.get('pick').execute(message, args, bot, Discord);
	} else if (command === 'members') {
		bot.guilds.cache.forEach((guild) => {
			message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`);
		});
		message.delete({ timeout: 50 }).catch(console.error);
	} else if (command === 'gg') {
		bot.commands.get('gg').execute(message, args, bot, Duration);
	} else if (command === 'spam') {
		bot.commands.get('spam').execute(message, args, bot);
	} else if (command === 'echo') {
		bot.commands.get('echo').execute(message, args, bot);
	} else if (command === 'help') {
		bot.commands.get('help').execute(message, args, Discord);
	} else if (command === 'status') {
		bot.commands.get('status').execute(message, args, bot);
	} else if (command === 'pm') {
		bot.commands.get('pm').execute(message, args, bot);
	} else if (command === 'ctc') {
		bot.commands.get('ctc').execute(message, args, bot);
	} else if (command === 'cvc') {
		bot.commands.get('cvc').execute(message, args, bot);
	}
});

bot.login(config.token);
