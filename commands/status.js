module.exports = {
    name : "status",
    description : "set bot status",
    execute(message, args, bot) {
        let msgArgs = args.slice(0).join(" ");
        console.log(msgArgs)
        if(args[0] === "watching") {
            bot.user.setPresence(`Watching over ${bot.users.size} people`);
        } else {
            bot.user.setPresence({
                activity: {
                    name: msgArgs,
                    type: 0,
                },
            })
        }
    }
}