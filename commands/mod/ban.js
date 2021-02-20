module.exports = {
	name : "Ban", 
	description : "bans the mentioned user",
	aliases: ["ban"],
	active: true,
	perms: ['KICK_MEMBERS'],
	usage: "`$ban <@user>`",
	execute(message=message, args=args, bot=bot) {
		const { member, mentions } = message;
		if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')) {
			const target = mentions.users.first();
			if (target) {
				const targetMember = message.guild.members.cache.get(target.id);
				targetMember.ban();
				message.channel.send(
					`<@${targetMember.id}>, has been banned lmaoooooo. Get yo butt outta here.`
				);
			} else {
				message.channel.send(
					`<@${member.id}>, bro you gotta tell me who to ban stupid. SMH.`
				);
			}
		} else {
			message.channel.send("Bro you don't even have perms. You cant just ban people man.");
		}
	}
};
