module.exports = {
    name : "status",
    description : "set bot status",
    execute(message, args, bot) {
        console.log(bot.users.size);
        if(args[0] === "watching") {
            bot.user.setActivity(`over many people and ${bot.guilds.cache.size} servers`, { type: 'WATCHING' });
        } else {
            var msgArgs = args.slice(0).join(" ");
            bot.user.setPresence({
                activity: {
                    name: msgArgs,
                    type: 0,
                },
            })
        }
    }
}