const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
	name : "Guessing game", 
	description : "A guessing game",
	aliases: ["gg", "guess"],
	perms: null,
	active: true,
	usage: "`$gg <number (range that the correct number can be)>`",
	cooldownTime: 60000,
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		const cooldown = cooldowns.get(message.author.id);
        if(cooldown && !message.author.id === '535671100001222668') {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in ${remaining}`)
		} else {

			gg(message, args, Discord);
			
			cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
			setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
		}
	}
}

const gg = (message, args, Discord) => {
	if (!args[0]) {
		message.reply('From 0 - wut bruh');
	} else {
		const number = Math.floor(Math.random() * args[0]);
		if (number >= 100000) {
			message.reply('bro are you tryna crash my server???? Nice try idiot.');
			message.delete({ timeout: 20 }).catch(console.error);
		} else {
			const filter = m => m.author.id === message.author.id;
			message.reply('Pick a number from ' + '`' + '0 - ' + args[0] + '`').then(() => {
				message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
					.then(collected => {
						if (collected.first().content == 'cancel') {
							message.reply('Bruh what a simp.');
						} else if (parseInt(number) === parseInt(collected.first().content)) {
							message.reply('Nice job!');
						} else {
							message.reply('Lmao ure trash. The number was ' + '`' + number + '`');
						}
					})
					.catch(collected => {
						message.reply('Slowpoke.');
					});
			})
			// message.channel
			// 	.awaitMessages(filter, {
			// 		max: 1, // leave this the same
			// 		time: 10000 // time in MS. there are 1000 MS in a second
			// 	})
			// 	.then(async (collected) => {
			// 		if (collected.first().content == 'cancel') {
			// 			message.reply('Bruh what a simp.');
			// 		} else if (parseInt(number) === parseInt(collected.first().content)) {
			// 			message.reply('Nice job!');
			// 		} else {
			// 			message.reply('Lmao ure trash. The number was ' + '`' + number + '`');
			// 		}
			// 	})
			// 	.catch(() => {
			// 		// what to do if a user takes too long goes here
			// 		message.reply('Slowpoke.');
			// 	});
		}
	}
}
