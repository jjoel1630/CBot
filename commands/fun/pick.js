module.exports = {
	name : "Pick", 
	description : "picks between multiple options SEPARATED BY A SPACE",
	aliases: ["pick"],
	perms: null, 
	active: true,
	usage: "`$pick <option 1> <option 2> ...`",
	execute(message=message, args=args, bot=bot, Discord=Discord) {
		var index = Math.floor(Math.random() * args.length);
		args.join(', ')
		const pickEmbed = new Discord.MessageEmbed()
			.setTitle('Options: ' + args)
			.addField('Result: ' + args[index], 'That was the result')
			.setThumbnail(message.author.avatarURL());
		message.channel.send(pickEmbed);
		message.delete({ timeout: 100 }).catch(console.error);
	}
};
