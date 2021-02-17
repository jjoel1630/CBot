module.exports = {
	name : "ping", 
	description : "ping",
	aliases: ["ping"],
	execute(message=message, args=args, bot=bot) {
		message.channel.send('pong');	
	}
};
