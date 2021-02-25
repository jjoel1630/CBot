module.exports = {
	name : "Kick", 
	description : "kicks the mentioned used",
	aliases: ["kick"],
	perms: ["BAN_MEMBERS"],
	active: false,
	usage: "`$kick <@user>`",
	execute(message=message, args=args, bot=bot) {
		const { member, mentions } = message;
		if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('KICK_MEMBERS')) {
			const target = mentions.users.first();

			if(target.id === '814565277480124427') {
				message.channel.send('u cant kick my creator dumbo stop trying');
				return;
			}

			if (target) {
				try {
					const targetMember = message.guild.members.cache.get(target.id);
					targetMember.kick().then(() => {
						message.channel.send(
							`<@${targetMember.id}>, has been banned lmaoooooo. Get yo butt outta here.`
						);
					}).catch(err => {
						message.channel.send(`stop tryna kick people that have a higher role than u. hey admins kick <@${message.author.id}>`);
						return;
					})
				} catch(err) {
					message.channel.send(`stop tryna kick people that have a high role than u. hey admins kick <@${target.id}>`);
				}
			} else {
				message.channel.send(`<@${member.id}>, bro you gotta tell me who to kick stupid. SMH.`);
			}
		} else {
			message.channel.send("Bro you don't even have perms. You cant just kick people man.");
		}
	}
};
