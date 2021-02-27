const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
	name : "Ban", 
	description : "bans the mentioned user",
	aliases: ["ban"],
	active: true,
	perms: ['KICK_MEMBERS'],
	usage: "`$ban <@user>`",
	cooldownTime: 10000,
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		if(cooldown) {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in remaining`)
		} else {

			ban(message, args);

			cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
			setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
		}
	}
}


const ban = (message, args) => {
	const { member, mentions } = message;
	if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')) {
		const target = mentions.users.first();

		if(target.id === '814565277480124427') {
			message.channel.send('u cant ban my creator dumbo stop trying');
			return;
		}

		if (target) {
			try {
				const targetMember = message.guild.members.cache.get(target.id);
				targetMember.ban().then(() => {
					message.channel.send(
						`<@${targetMember.id}>, has been banned lmaoooooo. Get yo butt outta here.`
					);
				}).catch(err => {
					message.channel.send(`stop tryna ban people that have a higher role than u. hey admins ban <@${message.author.id}>`);
					return;
				})
			} catch(err) {
				message.channel.send(`stop tryna ban people that have a high role than u. hey admins ban <@${target.id}>`);
			}
		} else {
			message.channel.send(
				`<@${member.id}>, bro you gotta tell me who to ban stupid. SMH.`
			);
		}
	} else {
		message.channel.send("Bro you don't even have perms. You cant just ban people man.");
	}
}