const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
	name : "Spam", 
	description : "spams a message for a certain number of times",
	aliases: ["spam"],
	active: true,
	perms: 'ADMINISTRATOR', 
	usage: "$spam <number of times> <message>",
	cooldownTime: 1000000,
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		const cooldown = cooldowns.get(message.author.id);
        if(cooldown && !message.author.id === '535671100001222668') {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in ${remaining}`)
		} else {

			spam(message, args);
			
			cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
			setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
		}
	}
}

const spam = (message, args) => {
	// if(message.author.id === '676257039839920148') {
	// 	message.channel.send('frick u chait');
	// 	return;
	// }
	// message.channel.send('yall idiots are so stupid frickin overusing the spam command. cuz of these dumbos this command is now permanently shut down. ');
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
