module.exports = {
	name : "Poll", 
	description : "creates a poll",
	aliases: ["poll"],
	perms: ['ADD_REACTIONS', 'SEND_MESSAGES'],
	usage: "`$poll <what you want to poll>`",
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		if (!args[0]) {
			message.channel.send('you have to supply arguments for what you want to poll for.');
			return;
		}

		let msgArgs = args.slice(0).join(' ');

		message.channel.send('📋 ' + '**' + msgArgs + '**').then((messageReaction) => {
			messageReaction.react('✅');
			messageReaction.react('❌');
			messageReaction.react('🤷‍♂️');
			message.delete({ timeout: 100 }).catch(console.error);
		});
	}
};
