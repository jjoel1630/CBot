module.exports = {
	name : "ban", 
	description : "ban", 
	execute(message, args, bot) {
		const { member, mentions } = message;
		if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')) {
			const target = mentions.users.first();
			if (target) {
				const targetMember = message.guild.members.cache.get(target.id);
				targetMember.ban();
				message.channel.send(
					`${args[0]}, has been banned lmaoooooo. Get yo butt outta here.`
				);
			} else {
				message.channel.send(
					`<@${message.member.user.tag}>, bro you gotta tell me who to ban stupid. SMH.`
				);
			}
		} else {
			message.channel.send("Bro you don't even have perms. You cant just ban people man.");
		}
	}
};
