module.exports = {
	name : "help", 
	description : "help",
	execute(message, args, Discord, Duration) {
		const helpEmbed = new Discord.MessageEmbed()
		.setTitle('Commands')
		.addFields(
			{ name: 'Prefix', value: "$ (Sorry can't change it yet)." },
			{
				name: 'cls + amount of messages (int: max 100 at a time)',
				value: 'Clears messages except pinned ones'
			},
			{
				name: 'echo + what you want to echo',
				value: 'the bot just says whatever you type as arguements'
			},
			{
				name: "gg (guessing game) + (int: just don't go crazy)",
				value: 'Basically the int is just how high you want to go. 0 - whatever number'
			},
			{
				name: 'i + (whatever image you want to search)',
				value: 'Randomly selects an image that you pass in'
			},
			{
				name: 'pick + (whatever you want it to choose from)',
				value: 'Randomly selects an option (its always right!)'
			},
			{
				name: 'poll + (question you want to poll)',
				value: 'Launches a poll that users can react yes, no, maybe'
			},
			{
				name:
					'spam + (int: number of times you wanna spam) + whatever you want the bot to spam',
				value:
					'Simple spam command :). Only people with the manage_messages perm can use this tho. oof'
			},
			{ name: 'welcome + (name [optional])', value: 'welcome message' }
		)
		.setThumbnail(message.author.avatarURL());
		const used = new Map();

		const cooldown = used.get(message.author.id);
		if (cooldown) {
			const remaining = Duration(cooldown - Date.now(), { units: [ 'h', 'm' ], round: true });
			message.reply(
				`you need to wait ${remaining} before using this command!`.catch((err) =>
					message.reply(`${err}`)
				)
			);
		} else {
			message.channel.send(helpEmbed);
			used.set(message.author.id, Date.now() + 1000 * 7);
			setTimeout(() => {
				used.delete(message.author.id), 1000 * 7;
			});
		}
	}
};
