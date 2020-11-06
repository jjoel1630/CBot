module.exports = {
    name : "simp",
    description : "simp detector",
    execute(message, args, bot) {
        var rate = Math.floor(Math.random() * 100);
        if (message.author.id === '535671100001222668' && !args[0]) {
			message.channel.send(`God is not a simp`);
		} else if (!args[0]) {
			var rate = Math.floor(Math.random() * 100);
			if (rate === 0) {
				message.channel.send(
					`Yo ${args[0]}, you aint a simp!`
				);
			} else {
				message.channel.send(
					`${args[0]} is ${rate}% simp`
				);
			}
		} else if (
			args[0] === 'Joel' ||
			args[0] === 'joel' ||
			message.mentions.users.first().id === '535671100001222668'
		) {
			message.channel.send(`God is not a simp`);
		} else if (args[0]) {
			var rate = Math.floor(Math.random() * 100);
			message.channel.send(
                `${args[0]} is ${rate}% simp.`
            );
		}
    }

}