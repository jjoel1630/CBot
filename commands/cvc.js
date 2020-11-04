module.exports = {
	callback : (message, args, bot) => {
		let msgArgs = args.slice(0).join(' ');

		message.guild.channels
			.create(msgArgs, {
				type: 'voice'
			})
			.then((channel) => {
				channel.setUserLimit(limit);
				message.channel.send(msgArgs + ' voice channel created');
			});
	}
};
