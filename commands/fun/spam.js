module.exports = {
	name : "Spam", 
	description : "spams a message for a certain number of times",
	aliases: ["spam"],
	perms: 'ADMINISTRATOR', 
	usage: "$spam <number of times> <message>",
	execute(message=message, args=args, bot=bot) {
		if (!args[0]) {
			message.channel.send('How many times u wanna spam bruh');
		}
		console.log(typeof args[0]);
		if (parseInt(args[0]) >= 50) {
			message.channel.send('wtf are u tryna do, crash my server???????');
		} else if (Number.isInteger(parseInt(args[0]))) {
			var times = parseInt(args[0]);
			args.shift();
			if (message.member.hasPermission('ADMINISTRATOR')) {
				let msgArgs = args.slice(0).join(' ');
				for (let i = 0; i < times; i++) {
					message.channel.send(msgArgs + ' ');
				}
			} else {
				message.channel.send("lmao you don't have the perms. HAHAHAHAHA.");
				message.delete({ timeout: 100 }).catch(console.error);
			}
		} else {
			message.channel.send(
				'bro ure first arguement has to be an integer! I would be SMH if i had one.'
			);
		}
	}
};
