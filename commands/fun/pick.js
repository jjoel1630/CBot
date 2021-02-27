const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
	name : "Pick", 
	description : "picks between multiple options SEPARATED BY A SPACE",
	aliases: ["pick"],
	perms: null, 
	active: true,
	usage: "`$pick <option 1> <option 2> ...`",
	cooldownTime: 30000,
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		if(cooldown) {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in remaining`)
		} else {
			
			var index = Math.floor(Math.random() * args.length);
			args.join(', ')
			const pickEmbed = new Discord.MessageEmbed()
				.setTitle('Options: ' + args)
				.addField('Result: ' + args[index], 'That was the result')
				.setThumbnail(message.author.avatarURL());
			message.channel.send(pickEmbed);
			message.delete({ timeout: 100 }).catch(console.error);

			cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
			setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
		}
	}
}
