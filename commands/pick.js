module.exports = {
	name : "pick", 
	descriptiom : "pick",
	execute(message, args, bot, Discord) {
		var index = Math.floor(Math.random() * args.length);
		const pickEmbed = new Discord.MessageEmbed()
			.setTitle('Question: ' + args)
			.addField('Result: ' + args[index], 'That was the result')
			.setThumbnail(message.author.avatarURL());
		message.channel.send(pickEmbed);
		message.delete({ timeout: 100 }).catch(console.error);
	}
};
