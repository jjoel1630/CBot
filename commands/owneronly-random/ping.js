module.exports = {
	name : "ping", 
	description : "ping",
	aliases: ["ping"],
	active: false,
	perms: null,
	usage: "only the owner can run this command lmao",
	execute(message=message, args=args, bot=bot) {
		message.channel.send('pong');	
	}
};
