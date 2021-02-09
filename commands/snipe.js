module.exports = {
    name: 'snipe',
    description: 'gets last deleted msg',
    aliases: ['snipe'],
    execute(message=message, args=args, bot=bot) {
        // console.log(typeof(deletedMsg));
        // message = deletedMsg.get('deleted msg').message;
        // author = deletedMsg.get('deleted msg').author;
        // createdAt = deletedMsg.get('deleted msg').created;

        // message.channel.send(`message: ${message}, author: ${author}, createdAt: ${createdAt}`);
    }
}