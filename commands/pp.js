module.exports = {
	name : "pp", 
	description : "pp",
	aliases: ["pp"],
	execute(message=message, args=args, bot=bot) {
		if (message.author.id === '535671100001222668' && !args[0]) {
			message.channel.send(`The God's pp is too long to calculate!`);
		} else if (!args[0]) {
			var sizeStr = '8';
			var size = Math.floor(Math.random() * 15);
			if (size === 0) {
				message.channel.send(
					`${message.member.user
						.tag}'s pp is 8D long. Wtf u are either a girl, or your pp is non-existent!`
				);
			} else {
				for (let i = 0; i <= size; i++) {
					sizeStr = sizeStr + '=';
					if (i == size) {
						sizeStr = sizeStr + 'D';
					}
				}
				message.channel.send(
					`${message.member.user.tag}'s pp is ${sizeStr} long :). Don't ask me how I know.`
				);
			}
		} else if (
			args[0] === 'Joel' ||
			args[0] === 'joel' ||
			message.mentions.users.first().id === '535671100001222668'
		) {
			message.channel.send(`The God's pp is too long to calculate!`);
		} else if (args[0]) {
			var sizeStr = '8';
			var size = Math.floor(Math.random() * 15);
			for (let i = 0; i <= size; i++) {
				sizeStr = sizeStr + '=';
				if (i == size) {
					sizeStr = sizeStr + 'D';
				}
			}
			message.channel.send(`${args[0]}'s pp is ${sizeStr} long :). Don't ask me how I know.`);
		}
	}
};
