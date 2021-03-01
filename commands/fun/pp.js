const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
	name : "PP", 
	description : "accurately finds the size of your pp",
	aliases: ["pp"],
	perms: null,
	active: true,
	usage: "`$pp <name of person>`", 
	cooldownTime: 30000,
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		const cooldown = cooldowns.get(message.author.id);
        if(cooldown && !message.author.id === '535671100001222668') {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in ${remaining}`)
		} else {

			pp(message, args);
			
			cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
			setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
		}
	}
}

const pp = (message, args) => {
	const targetMember = message.mentions.users.first();
	const size = Math.floor(Math.random() * 300);
	var sizeStr = '8';
	for (let i = 0; i <= size; i++) {
		sizeStr = sizeStr + '=';
		if (i === size) {
			sizeStr = sizeStr + 'D';
		}
	}

	if((message.author.id === '535671100001222668' && !args[0]) || args[0]?.toLowerCase() === 'joel' || message.mentions.users.first()?.id === '535671100001222668') {
		message.channel.send(`The God's pp is too big too calculate!`);
		return;
	} else if(targetMember) {
		if(sizeStr === '8') {
			message.channel.send(`<@!${targetMember.id}>'s pp is 8D long. Wtf u are either a girl, or your pp is non-existent!`);
		} else {
			message.channel.send(`<@!${targetMember.id}>'s pp is ${sizeStr} long :). Don't ask me how I know.`);
		}
	} else if(args[0]) {
		if(sizeStr === '8') {
			message.channel.send(`${args[0]}'s pp is 8D long. Wtf u are either a girl, or your pp is non-existent!`);
		} else {
			message.channel.send(`${args[0]}'s pp is ${sizeStr} long :). Don't ask me how I know.`);
		}
	} else if(!args[0]) {
		if(sizeStr === '8') {
			message.channel.send(`${message.member.id}'s pp is 8D long. Wtf u are either a girl, or your pp is non-existent!`);
		} else {
			message.channel.send(`${message.member.id}'s pp is ${sizeStr} long :). Don't ask me how I know.`);
		}
	} else {
		message.channel.send('your command format is wrong');
	}
	// if (message.author.id === '535671100001222668' && !args[0]) {
	// 	message.channel.send(`The God's pp is too long to calculate!`);
	// } else if (!args[0]) {
	// 	var sizeStr = '8';
	// 	var size = Math.floor(Math.random() * 15);
	// 	if (size === 0) {
	// 		message.channel.send(
	// 			`${message.member.user
	// 				.tag}'s pp is 8D long. Wtf u are either a girl, or your pp is non-existent!`
	// 		);
	// 	} else {
	// 		for (let i = 0; i <= size; i++) {
	// 			sizeStr = sizeStr + '=';
	// 			if (i == size) {
	// 				sizeStr = sizeStr + 'D';
	// 			}
	// 		}
	// 		message.channel.send(
	// 			`${message.member.user.tag}'s pp is ${sizeStr} long :). Don't ask me how I know.`
	// 		);
	// 	}
	// } else if (args[0]) {
	// 	if (args[0].toLowerCase() === 'joel') {
	// 		message.channel.send(`The God's pp is too long to calculate!`);
	// 	} else if(message.mentions.users.first()) {
	// 		if (message.mentions.users.first().id === '535671100001222668') {
	// 			message.channel.send(`The God's pp is too long to calculate!`);
	// 		}
	// 	} else {
	// 		var sizeStr = '8';
	// 		var size = Math.floor(Math.random() * 15);
	// 		for (let i = 0; i <= size; i++) {
	// 			sizeStr = sizeStr + '=';
	// 			if (i == size) {
	// 				sizeStr = sizeStr + 'D';
	// 			}
	// 		}
	// 		message.channel.send(`${args[0]}'s pp is ${sizeStr} long :). Don't ask me how I know.`);
	// 	}
	// }
}
