module.exports = {
	name: "Echo",
	description: "I will echo whatever you tell me to say",
	aliases: ['echo'],
	active: true,
	perms: 'SEND_MESSAGES', 
	usage: '`$echo <text>`',
	execute(message=message, args=args, bot=bot) {
		if(!args[0]) {
			message.channel.send("what do you want me to echo idiot???")
		}
		let msgArgs = args.slice(0).join(' ');
		message.channel.send(msgArgs);
		message.delete({ timeout: 5 }).catch(console.error);
	}
};
