module.exports = {
	name: 'kick',
	description: 'kick',
	execute(message, args, bot) {
		const { member, mentions } = message;
		if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('KICK_MEMBERS')) {
			const target = mentions.users.first();
			if (target) {
				const targetMember = message.guild.members.cache.get(target.id);
				targetMember.kick();
				message.channel.send(
					`<@${member.id}>, has been kicked lmaoooooo. Get yo butt outta here.`
				);
			} else {
				message.channel.send(
					`<@${member.id}>, bro you gotta tell me who to kick stupid. SMH.`
				);
			}
		} else {
			message.channel.send("Bro you don't even have perms. You cant just kick people man.");
		}
	}
};
