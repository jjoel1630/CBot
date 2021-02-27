const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
	name : "Create text channel", 
	description : "creates a text channel",
	aliases: ["ctc", "createtextchannel"],
	perms: ['MANAGE_CHANNELS', 'MANAGE_GUILD'],
	active: true,
	usage: "`$ctc <name of text channel>`",
	cooldownTime: 20000,
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		const cooldown = cooldowns.get(message.author.id);
        if(cooldown && !message.author.id === '535671100001222668') {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in ${remaining}`)
		} else {
			
			let msgArgs = args.slice(0).join(' ');

			message.guild.channels
				.create(msgArgs, {
					type: 'text'
				})
				.then((channel) => {
					message.channel.send(msgArgs + ' text channel created');
				});

			cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
			setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
		}
	}
}
