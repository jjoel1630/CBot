module.exports = {
    name: 'ping', 
    description: 'ping cmd',
    execute(message, args) {
        message.channel.send('pong'); 
    }
}