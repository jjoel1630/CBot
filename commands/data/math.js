const functions = require('../../mathfunctions.js');

module.exports = {
    name: 'Calculator',
    description: 'calculates various operations in math',
    aliases: ['math', 'calc', 'calculator'],
    perms: null,
    active: true,
    usage: '``',
    execute(message=message, args=args, bot=bot) {
        if(!args[1]) {
            message.channel.send(`bruv provide numbers to do the operation on. no wonder you need a calculator lmao.`);
            return;
        }

        switch(args[0]) {
            case args[0] === 'cuberoot':
                functions.cubeRoot(args[0]);
                break;
            default:
                message.channel.send('what operation do you want me to perform smart one??? no wonder you need a calculator lmao.');
                break;
        }
    }
}