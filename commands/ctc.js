module.exports = {
	name: 'ctc',
	description: 'create text channel',
	execute(message, args, bot) {
		let msgArgs = args.slice(0).join(' ');

		message.guild.channels
			.create(msgArgs, {
				type: 'text'
			})
			.then((channel) => {
				message.channel.send(msgArgs + ' text channel created');
			});
	}
};
