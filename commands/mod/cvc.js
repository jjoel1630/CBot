module.exports = {
	name : "Create voice channel", 
	description : "creates a voice channel",
	aliases: ["cvc", "createvoicechannel"],
	usage: "`$cvc <name of voice channel>`",
	active: true,
	perms: ['MANAGE_CHANNELS', 'MANAGE_GUILD', ],
	execute(message=message, args=args, bot=bot) {
		let msgArgs = args.slice(0).join(' ');

		message.guild.channels
			.create(msgArgs, {
				type: 'voice'
			})
			.then((channel) => {
				channel.setUserLimit(limit);
				message.channel.send(msgArgs + ' voice channel created');
			});
	}
};

const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
	name : "Create voice channel", 
	description : "creates a voice channel",
	aliases: ["cvc", "createvoicechannel"],
	perms: ['MANAGE_CHANNELS', 'MANAGE_GUILD'],
	active: true,
	usage: "`$cvc <name of voice channel>`",
	cooldownTime: 20000,
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		if(cooldown) {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in remaining`)
		} else {

			let msgArgs = args.slice(0).join(' ');

			message.guild.channels
				.create(msgArgs, {
					type: 'voice'
				})
				.then((channel) => {
					channel.setUserLimit(limit);
					message.channel.send(msgArgs + ' voice channel created');
				});

			cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
			setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
		}
	}
}