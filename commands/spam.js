const { model } = require("mongoose");
module.exports = {
    name : "spam",
    description : "spam",
    execute(message, args) {
        if(!args[0]) {
            message.channel.send("How many times u wanna spam bruh");
        }
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            let msgArgs = args.slice(0).join(" ");
            for(let i = 0; i < args[0]; i++) {
                message.channel.send(msgArgs + " " + i);
            }
        }
    }
}
