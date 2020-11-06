module.exports = {
	name: "echo",
	description: "echo",
	aliases: ['echo'],
	execute(message=message, args=args, bot=bot) {
		if(!args[0]) {
			message.channel.send("what do you want me to echo idiot???")
		}
		let msgArgs = args.slice(0).join(' ');
		message.channel.send(msgArgs);
		message.delete({ timeout: 5 }).catch(console.error);
	}
};
