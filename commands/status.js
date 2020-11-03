module.exports = {
    name : "status",
    description : "set bot status",
    execute(message, args, bot) {
        console.log(msgArgs)
        if(args[0] === "watching") {
            bot.user.setPresence(`Watching over ${bot.users.size} people`);
        } else {
            let msgArgs = args.slice(0).join(" ");
            bot.user.setPresence({
                activity: {
                    name: msgArgs,
                    type: 0,
                },
            })
        }
    }
}