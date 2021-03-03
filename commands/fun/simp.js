const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
	name : "Simp command",
	description : "accurately calculates your simp percentage",
	aliases: ["simp"],
	perms: null,
	active: true, 
	usage: "`$simp <name of person>`",
	cooldownTime: 30000,
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		const cooldown = cooldowns.get(message.author.id);
        if(cooldown && message.author.id !== '535671100001222668') {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in ${remaining}`)
		} else {
			
			simp(message, args)

			cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
			setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
		}
	}
}

const simp = (message, args) => {
	var rate = Math.floor(Math.random() * 100);
	const targetMember = message.mentions.users.first();

	if((message.author.id === '535671100001222668' && !args[0]) || args[0]?.toLowerCase() === 'joel' || message.mentions.users.first()?.id === '535671100001222668') {
		message.channel.send(`God is not a simp`);
		return;
	} else if(targetMember) {
		if(iq <= 0) {
			message.channel.send(`<@!${targetMember.id}> aint a simp!`);
		} else {
			message.channel.send(`<@!${targetMember.id}> is ${rate}% simp`);
		}
	} else if(args[0]) {
		if(iq <= 0) {
			message.channel.send(`${args[0]} aint a simp!`);
		} else {
			message.channel.send(`${args[0]} is ${rate}% simp`);
		}
	} else if(!args[0]) {
		if(iq <= 0) {
			message.channel.send(`${message.member.id} aint a simp!`);
		} else {
			message.channel.send(`${message.member.id} is ${rate}% simp`);
		}
	} else {
		message.channel.send('your command format is wrong');
	}
	// if (message.author.id === '535671100001222668' && !args[0]) {
	// 	message.channel.send(`God is not a simp`);
	// } else if (!args[0]) {
	// 	var rate = Math.floor(Math.random() * 100);
	// 	if (rate === 0) {
	// 		message.channel.send(
	// 			`Yo ${message.member.user.tag}, you aint a simp!`
	// 		);
	// 	} else {
	// 		message.channel.send(
	// 			`${message.member.user.tag} is ${rate}% simp`
	// 		);
	// 	}
	// } else if (args[0]) {
	// 	if(args[0].toLowerCase() === 'joel') {
	// 		message.channel.send(`The God's IQ is too high to calculate!`);
	// 	} else if(message.mentions.users.first()) {
	// 		if(message.mentions.users.first().id === '535671100001222668') {
	// 			message.channel.send(`God is not a simp`);
	// 		}
	// 	} else {
	// 		var rate = Math.floor(Math.random() * 100);
	// 		message.channel.send(
	// 			`${args[0]} is ${rate}% simp.`
	// 		);
	// 	}
	// }
}