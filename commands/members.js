module.exports = {
    name : "members",
    description : "members",
    execute(message, args, bot) {
        bot.guilds.cache.forEach((guild) => {
			message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`);
		});
		message.delete({ timeout: 50 }).catch(console.error);
    }
}