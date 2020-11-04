module.exports = {
	name : "iq", 
	descriptiom : "iq",
	execute(message, args, bot) {
		if (message.author.id === '535671100001222668' && !args[0]) {
			message.channel.send(`The God's IQ is too high to calculate!`);
		} else if (!args[0]) {
			var iq = Math.floor(Math.random() * 300);
			if (iq === 0) {
				message.channel.send(
					`${message.member.user.tag}'s IQ is so low it doesn't register lmaooo`
				);
			} else {
				message.channel.send(`${message.member.user.tag}'s IQ is ${iq}`);
			}
		} else if (
			args[0] === 'Joel' ||
			args[0] === 'joel' ||
			message.mentions.users.first().id === '535671100001222668'
		) {
			message.channel.send(`The God's IQ is too high to calculate!`);
		} else if (args[0]) {
			var iq = Math.floor(Math.random() * 15);
			message.channel.send(`${args[0]}'s IQ is ${iq}.`);
		}
	}
};
