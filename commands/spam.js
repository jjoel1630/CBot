const { delete } = require("request");

module.exports = {
    name : "spam",
    description : "spam",
    execute(message, args) {
        if(!args[0]) {
            message.channel.send("How many times u wanna spam bruh");
        }
        var times = args[0];
        args[0] = "";
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            let msgArgs = args.slice(0).join(" ");
            for(let i = 0; i < times; i++) {
                message.channel.send(msgArgs + " " + i);
            }
        }
    }
}
