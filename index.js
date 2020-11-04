//Packages / important modules
const Discord = require('discord.js');
const ms = require('ms');
const fs = require('fs');
const ytdl = require('ytdl-core');
const cheerio = require('cheerio');
const request = require('request');
const Duration = require('humanize-duration');
const config = require('./config.json');
const command = require('./command');
const WOKCommands = require('wokcommands')
require('dotenv').config()

//commands
const ping = require('./commands/ping');

//clients
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const Embed = new Discord.MessageEmbed();

bot.on('ready', () => {
	console.log('ACTIVE!');

	new WOKCommands(bot, "commands", "features")
	.setDefaultPrefix("$");	
});

bot.on('message', (message) => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	let args = message.content.substring(config.prefix.length).split(' ');
	const commandTyped = args.shift().toLowerCase();

	if (command === 'members') {
		bot.guilds.cache.forEach((guild) => {
			message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`);
		});
		message.delete({ timeout: 50 }).catch(console.error);
	}
});

bot.login(config.token);
