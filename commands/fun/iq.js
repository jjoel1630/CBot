const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
	name : "IQ", 
	description : "accurately finds your iq",
	aliases: ["iq"],
	perms: null,
	active: true,
	usage: "`$iq <name of person>`",
	cooldownTime: 30000,
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		const cooldown = cooldowns.get(message.author.id);
        if(cooldown && message.author.id !== '535671100001222668') {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in ${remaining}`)
		} else {
			
			iq(message, args)

			cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
			setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
		}
	}
}

const iq = (message, args) => {
	const targetMember = message.mentions.users.first();
	const iq = Math.floor(Math.random() * 300);

	if((message.author.id === '535671100001222668' && !args[0]) || args[0]?.toLowerCase() === 'joel' || message.mentions.users.first()?.id === '535671100001222668') {
		message.channel.send(`The God's IQ is too high to calculate!`);
		return;
	} else if(targetMember) {
		if(iq <= 0) {
			message.channel.send(`<@!${targetMember.id}>'s IQ is so low, it doesnt even register lmao`);
		} else {
			message.channel.send(`<@!${targetMember.id}>'s IQ is ${iq}`);
		}
	} else if(args[0]) {
		if(iq <= 0) {
			message.channel.send(`${args[0]}'s IQ is so low, it doesnt even register lmao`);
		} else {
			message.channel.send(`${args[0]}'s IQ is ${iq}`);
		}
	} else if(!args[0]) {
		if(iq <= 0) {
			message.channel.send(`<@!${message.member.id}>'s IQ is so low, it doesnt even register lmao`);
		} else {
			message.channel.send(`<@!${message.member.id}>'s IQ is ${iq}`);
		}
	} else {
		message.channel.send('your command format is wrong');
	}
	// if (message.author.id === '535671100001222668' && !args[0]) {
	// 	message.channel.send(`The God's IQ is too high to calculate!`);
	// } else if (!args[0]) {
	// 	var iq = Math.floor(Math.random() * 300);
	// 	if (iq === 0) {
	// 		message.channel.send(
	// 			`${message.member.user.tag}'s IQ is so low it doesn't register lmaooo`
	// 		);
	// 	} else {
	// 		message.channel.send(`${message.member.user.tag}'s IQ is ${iq}`);
	// 	}
	// } else if (args[0]) {
	// 	if (args[0].toLowerCase() === 'joel') {
	// 		message.channel.send(`The God's IQ is too high to calculate!`);
	// 	} else if(message.mentions.users.first()) {
	// 		if(message.mentions.users.first().id === '535671100001222668') {
	// 			message.channel.send(`The God's IQ is too high to calculate!`);
	// 		}
	// 	} else {
	// 		var iq = Math.floor(Math.random() * 300);
	// 		if (iq === 0) {
	// 			message.channel.send(
	// 				`${args[0]}'s IQ is so low it doesn't register lmaooo`
	// 			);
	// 		} else {
	// 			message.channel.send(`${args[0]}'s IQ is ${iq}`);
	// 	}
	// 	}
	// }
}