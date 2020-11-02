module.exports = {
    name : "echo",
    description : "echo message",
    execute(message, args) {
        let msgArgs = args.slice(0).join(" ");
        message.channel.send(msgArgs);
        message.delete({timeout: 5}).catch(console.error);
    }
}