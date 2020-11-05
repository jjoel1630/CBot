module.exports = {
	name : "ping", 
	description : "ping",
	execute(message, args, bot) {
		message.channel.send('pong');	
	}
};
