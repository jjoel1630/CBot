module.exports = {
	name : "cvc", 
	description : "create voice channel",
	aliases: ["cvc"],
	execute(message=message, args=args, bot=bot) {
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
