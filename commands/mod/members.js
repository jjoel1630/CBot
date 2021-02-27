module.exports = {
    name : "Members",
    description : "returns the amount of members",
    aliases: ["members"],
    perms: null,
    active: true,
    usage: "`$members`",
    execute(message=message, args=args, bot=bot) {
        bot.guilds.cache.forEach((guild) => {
			message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`);
		});
		message.delete({ timeout: 50 }).catch(console.error);
    }
}

const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
    name : "Members",
    description : "returns the amount of members",
    aliases: ["members"],
    perms: null,
    active: true,
    usage: "`$members`",
    cooldownTime: 5000,
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        if(cooldown) {
            const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
            message.channel.send(`chill bruva. you can run this command in remaining`)
        } else {
            
            bot.guilds.cache.forEach((guild) => {
                message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`);
            });

            cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
            setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
        }
    }
}