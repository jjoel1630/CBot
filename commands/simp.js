module.exports = {
    name : "simp",
	description : "simp detector",
	aliases: ["simp"],
    execute(message=message, args=args, bot=bot) {
        var rate = Math.floor(Math.random() * 100);
        if (message.author.id === '535671100001222668' && !args[0]) {
			message.channel.send(`God is not a simp`);
		} else if (!args[0]) {
			var rate = Math.floor(Math.random() * 100);
			if (size === 0) {
				message.channel.send(
					`Yo ${args[0]}, you aint a simp!`
				);
			} else {
				message.channel.send(
					`${args[0]} is ${rate}% simp`
				);
			}
		} else if (args[0]) {
			if(args[0].toLowerCase() === 'joel') {
				message.channel.send(`The God's IQ is too high to calculate!`);
			} else if(message.mentions.users.first()) {
				if(message.mentions.users.first().id === '535671100001222668') {
					message.channel.send(`God is not a simp`);
				}
			} else {
				var rate = Math.floor(Math.random() * 100);
			message.channel.send(
                `${args[0]} is ${rate}% simp.`
            );
			}
		}
    }
}