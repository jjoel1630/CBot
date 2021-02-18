module.exports = {
	name : "Create voice channel", 
	description : "creates a voice channel",
	aliases: ["cvc", "createvoicechannel"],
	usage: "`$cvc <name of voice channel>`",
	perms: ['MANAGE_CHANNELS', 'MANAGE_GUILD', ],
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
