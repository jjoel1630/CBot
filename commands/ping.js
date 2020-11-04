module.exports = {
	name : "ping", 
	descriptiom : "ping",
	execute(message, args, bot) {
		message.channel.send('pong');	
	}
};
