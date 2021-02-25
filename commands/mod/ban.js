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
						message.channel.send(`stop tryna ban people that have a high role than u. hey admins ban <@${message.author.id}>`);
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
};
