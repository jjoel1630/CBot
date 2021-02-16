module.exports = {
    name : "members",
    description : "members",
    aliases: ["members"],
    execute(message=message, args=args, bot=bot) {
        bot.guilds.cache.forEach((guild) => {
			message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`);
		});
		message.delete({ timeout: 50 }).catch(console.error);
    }
}