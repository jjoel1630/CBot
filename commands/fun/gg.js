module.exports = {
	name : "Guessing game", 
	description : "A guessing game",
	aliases: ["gg", "guess"],
	perms: null, 
	usage: "`$gg <number (range that the correct number can be)>`",
	execute(message=message, args=args, bot=bot, Discord=Discord, Duration=Duration) {
		const used = new Map();
		if (!args[0]) {
			message.reply('From 0 - wut bruh');
			message.delete({ timeout: 20 }).catch(console.error);
		} else {
			message.delete({ timeout: 20 }).catch(console.error);
			const number = Math.floor(Math.random() * args[0]);
			if (number >= 100000) {
				message.reply('bro are you tryna crash my computer???? Nice try idiot.');
				message.delete({ timeout: 20 }).catch(console.error);
			} else {
				message.reply('Pick a number from ' + '`' + '0 - ' + args[0] + '`');
				const filter = (m) => m.author.id === message.author.id;
				message.channel
					.awaitMessages(filter, {
						max: 1, // leave this the same
						time: 10000 // time in MS. there are 1000 MS in a second
					})
					.then(async (collected) => {
						if (collected.first().content == 'cancel') {
							message.reply('Bruh what a simp.');
						} else if (parseInt(number) === parseInt(collected.first().content)) {
							message.reply('Nice job!');
						} else {
							message.reply('Lmao ure trash. The number was ' + '`' + number + '`');
						}
					})
					.catch(() => {
						// what to do if a user takes too long goes here
						message.reply('Slowpoke.');
					});
			}
		}

		used.set(message.author.id, Date.now() + 1000 * 7);
		setTimeout(() => {
			used.delete(message.author.id), 1000 * 7;
		});
	}
};
