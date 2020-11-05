module.exports = {
	name : "pl", 
	description : "play",
	execute(message, args, bot) {
		if (args[1]) {
			message.channel.send('Can ' + args[0] + ' play ' + args[1]);
			message.delete({ timeout: 100 }).catch(console.error);
		} else if (args[0]) {
			message.channel.send('Can yall play ' + args[0]);
			message.delete({ timeout: 100 }).catch(console.error);
		} else {
			message.channel.send('Can yall play today');
			message.delete({ timeout: 100 }).catch(console.error);
		}
	}
};
