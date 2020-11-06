const { MessageReaction } = require('discord.js');

module.exports = {
	name : "poll", 
	description : "poll",
	aliases: ["poll"],
	execute(message=message, args=args, bot=bot, Embed=Embed) {
		Embed.setColor(0xffc300).setTitle('Poll').setDescription('yes or no poll');

		if (!args[0]) {
			message.channel.send(Embed);
			return;
		}

		let msgArgs = args.slice(0).join(' ');

		message.channel.send('📋 ' + '**' + msgArgs + '**').then((messageReaction) => {
			messageReaction.react('✅');
			messageReaction.react('❌');
			messageReaction.react('🤷‍♂️');
			message.delete({ timeout: 100 }).catch(console.error);
		});
	}
};
