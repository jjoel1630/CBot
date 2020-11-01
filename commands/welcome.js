const { Message } = require("discord.js");
module.exports = {
    name : "welcome", 
    description : "welcome", 
    execute(message, args) {
        if(args[0]) {
            message.channel.send("What's poppin " + args[0]);
            message.delete({timeout: 50}).catch(console.error);
        }
        else {
            message.channel.send("what's poppin");
            message.delete({timeout: 50}).catch(console.error);
        }
    }
}