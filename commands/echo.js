module.exports = {
	name : "echo", 
	descriptiom : "echo",
	execute(message, args, bot) {
		let msgArgs = args.slice(0).join(' ');
		message.channel.send(msgArgs);
		message.delete({ timeout: 5 }).catch(console.error);
	}
};
