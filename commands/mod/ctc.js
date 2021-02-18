module.exports = {
	name : "Create text channel", 
	description : "creates a text channel",
	aliases: ["ctc", "createtextchannel"],
	usage: "`$ctc <name of text channel>`",
	perms: ['MANAGE_CHANNELS', 'MANAGE_GUILD', ],
	execute(message=message, args=args, bot=bot) {
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
