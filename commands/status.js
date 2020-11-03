module.exports = {
    name : "status",
    description : "set bot status",
    execute(message, args, bot) {
        let msgArgs = args.slice(0).join(" ");
        console.log(msgArgs)
        bot.user.setPresence({
            activity: {
                name: msgArgs,
                type: 0,
            },
        })
    }
}