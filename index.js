//Packages / important modules
const Discord = require('discord.js');
const fs = require('fs');
const cheerio = require('cheerio');
const Duration = require('humanize-duration');
const config = require('./config.json');
const help = require('./help.js');
const AWS = require('aws-sdk');
require('dotenv').config();

//clients
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

deletedMsg = new Map();

// var customResponses = {
// 	'stopthecap': []
// }

const getDirectories = fs.readdirSync('./commands/', { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
for(let dir of getDirectories) {
	const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
	for (let file of commandFiles) {
		const command = require(`./commands/${dir}/${file}`);

		bot.commands.set(command.name, command);

		// active = {...active, name: [command.name, command.active]  };

		if(command.aliases && Array.isArray(command.aliases)) {
			command.aliases.forEach(alias => bot.aliases.set(alias, command.name))
		}
	}
}

bot.on('ready', async () => {
	console.log('ACTIVE!');
});

const whitelistedUsers = ['676257039839920148']

bot.on('message', message => {
	if(whitelistedUsers.includes(message.author.id)) {
		message.channel.send('frick u chait');
		return;
	}
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
		var frequencyRandom = Math.floor(Math.random() * 30);
		var messageRandom = Math.floor(Math.random() * 4);
		var list = ["GG", "Good one", "Well played", "Good game"]
		var messageGG = list[messageRandom];
		if(frequencyRandom === 5 || frequencyRandom === 12) {
			message.channel.send(messageGG);
			return;
		}
	} else {
		const guildID = message.guild.id;

		getPrefix(guildID, prefix => {
			if (!message.content.startsWith(prefix ?? config.prefix) || message.author.bot) return;

			let args = message.content.substring(prefix?.length || config.prefix.length).split(' '); 
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
				} // else if(cmd === 'stop'){
				// 	if(!message.author.id === '535671100001222668') {
				// 		message.channel.send("Are you the owner of this bot?? No dumbo!");
				// 		return;
				// 	} else if(message.author.id === '535671100001222668' && args[0] && bot.aliases.get(args[0])) {
				// 		const command = bot.commands.get(bot.aliases.get(args[0]));
				// 		command.active = false;
				// 	}
				//} 
				else if(bot.aliases.get(cmd)) {
					const command = bot.commands.get(bot.aliases.get(cmd));
					command.execute(message, args, bot, Discord, Duration, cheerio);
					// if(command.active === false) {
					// 	message.channel.send('this command aint available rn bruv. thas an oof');
					// 	return;
					// } else {
					// 	command.execute(message, args, bot, Discord, Duration, cheerio); 
					// }
				} else {
					return;
				}
		}
		});
	}
});

bot.on("messageDelete", (message) => {
	if (message.author.bot) return;
	deletedMsg.set("deleted msg", {'deletedContent': message.content, 'person': message.author.tag, 'created': message.createdAt});
});

// const token = process.env.token ? process.env.token : process.env.discord_bot_token;
const token = process.env.token ?? process.env.discord_bot_token ?? process.env.DISCORD_BOT_TOKEN_EC2;

// if(process.env.token) {
// 	token = process.env.token
// } else {
// 	token = process.env.discord_bot_token
// }

async function getPrefix(guildID, callbackPrefix) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: 'prefix',
        ProjectionExpression:"prefix",
        FilterExpression: "guildID = :gID",
        ExpressionAttributeValues: {
            ":gID": guildID,
        },
    };

    docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err);
            return({
                success: false,
                message: err
            });
        } else {
			const { Items } = data;
			const returnedPrefix = Items[0]?.prefix;
           	return callbackPrefix(returnedPrefix);
        }
    });
}

bot.login(token);
