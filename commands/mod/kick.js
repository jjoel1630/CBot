module.exports = {
	name : "Kick", 
	description : "kicks the mentioned used",
	aliases: ["kick"],
	perms: ["BAN_MEMBERS"],
	active: false,
	usage: "`$kick <@user> <reason>`",
	execute(message=message, args=args, bot=bot) {
		
	}
};

const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
	name : "Kick", 
	description : "kicks the mentioned used",
	aliases: ["kick"],
	perms: ["BAN_MEMBERS"],
	active: true,
	usage: "`$kick <@user> <reason>`",
	cooldownTime: 10000,
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		const cooldown = cooldowns.get(message.author.id);
        if(cooldown && message.author.id !== '535671100001222668') {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in ${remaining}`)
		} else {
			
			kick(message, args);

			cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
			setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
		}
	}
}

const kick = (message, args) => {
	if(!args[1]) {
		message.channel.send(`$kick <@user> <reason>`);
	}

	args.shift();
	const reason = args.join(" ");
	const { member, mentions } = message;

	if(!reason) {
		message.channel.send(`$kick <@user> <reason>`);
		return;
	}
	
	if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')) {
		const target = mentions.users.first();

		if(target?.id === '771769527456890880') {
			message.channel.send('u cant kick me dumbo stop trying');
			return;
		} else if(target?.id === '535671100001222668') {
			message.channel.send('u cant kick my creator dumbo stop trying');
			return;
		} else if(target?.id === message.member.id) {
			message.channel.send('you cannot kick yourself idiot');
			return;
		}

		if (target) {
			const targetMember = message.guild.members.cache.get(target.id);
			targetMember.kick({ reason: reason }).then(() => {
				message.channel.send(
					`<@${targetMember.id}>, has been kicked lmaoooooo. Get yo butt outta here.`
				);
			}).catch(err => {
				message.channel.send(`<@${targetMember.id}> has a higher role than me dumbo`);
				return;
			});
		} else {
			message.channel.send(
				`<@${member.id}>, bro you gotta tell me who to kick stupid. SMH.`
			);
		}
	} else {
		message.channel.send("Bro you don't even have perms. You cant just kick people man.");
	}
}
