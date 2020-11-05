module.exports = {
	name : "status", 
	description : "status",
	execute(message, args, bot) {
		console.log(bot.users.size);
		if (message.member.id == '535671100001222668') {
			if (args[0] === 'watching') {
				bot.user.setActivity(`over many people and ${bot.guilds.cache.size} servers`, {
					type: 'WATCHING'
				});
			} else {
				var msgArgs = args.slice(0).join(' ');
				bot.user.setPresence({
					activity: {
						name: msgArgs,
						type: 0
					}
				});
			}
		} else {
			message.channel.send('Are you the owner of this bot? No.');
		}
	}
};
