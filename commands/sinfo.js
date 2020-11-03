const { DiscordAPIError } = require('discord.js');

module.exports = {
	name: 'sinfo',
	description: 'server info',
	execute(message, args, bot, Discord) {
		const { guild } = message;

		const { name, region, memberCount, owner } = guild;
		const icon = guild.iconUrl;

		const infoEmbed = new Discord.MessageEmbed()
			.setTitle(`Server info for "${name}"`)
			.setThumbnail(icon)
			.addFields(
				{
					name: 'Region',
					value: region
				},
				{
					name: 'Members',
					value: memberCount
				},
				{
					name: 'owner',
					value: owner.user.tag
				}
			);
		message.channel.send(infoEmbed);
	}
};
