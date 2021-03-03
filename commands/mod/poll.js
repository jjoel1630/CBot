const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();

module.exports = {
	name : "Poll", 
	description : "creates a poll",
	aliases: ["poll"],
	active: true,
	perms: ['ADD_REACTIONS', 'SEND_MESSAGES'],
	usage: "`$poll <what you want to poll>`",
	cooldownTime: 10000,
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		const cooldown = cooldowns.get(message.author.id);
        if(cooldown && message.author.id !== '535671100001222668') {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in ${remaining}`)
		} else {
			if (!args[0]) {
				message.channel.send('you have to supply arguments for what you want to poll for.');
				return;
			}
	
			let msgArgs = args.slice(0).join(' ');
	
			message.channel.send('📋 ' + '**' + msgArgs + '**').then((messageReaction) => {
				messageReaction.react('✅');
				messageReaction.react('❌');
				messageReaction.react('🤷‍♂️');
				message.delete({ timeout: 100 }).catch(console.error);
			}).catch(err => {console.error(err);})

			cooldowns.set(message.author.id, Date.now() + 30000);
			setTimeout(() => cooldowns.delete(message.author.id), 30000);
		}
	}
};
