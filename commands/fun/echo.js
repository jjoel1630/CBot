const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
	name: "Echo",
	description: "I will echo whatever you tell me to say",
	aliases: ['echo'],
	active: true,
	perms: 'SEND_MESSAGES', 
	usage: '`$echo <text>`',
	cooldownTime: 3000,
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		if(cooldown) {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in remaining`)
		} else {
			
			if(!args[0]) {
				message.channel.send("what do you want me to echo idiot???");
				return;
			}
			let msgArgs = args.slice(0).join(' ');
			message.channel.send(msgArgs);
			message.delete({ timeout: 5 }).catch(console.error);

			cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
			setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
		}
	}
}
