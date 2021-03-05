const functions = require('../../mathfunctions.js');

module.exports = {
    name: 'Calculator',
    description: 'calculates various operations in math',
    aliases: ['math', 'calc', 'calculator'],
    perms: null,
    active: true,
    usage: '``',
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        if(!args[0]) {
            message.channel.send(`bruv tell me what operation you want to do. no wonder you need a calculator lmao. (get it. cuz ure that dumb. NVM)`);
            return;
        }

        if(args[0] === 'help') {
            const mathHelp = new Discord.MessageEmbed()
            .setTitle('Math Help')
            .setDescription('A mini calculator for your needs')
            .addFeilds(
                {
                    name: `Cuberoot`, value: `$math cuberoot <number>`
                },
                {
                    name: `Squareroot`, value: `$math squareroot <number>`
                },
                {
                    name: `Power`, value: `$math squareroot <number> <power>`
                },
                {
                    name: `Circumference`, value: `$math cirum <radius>`
                },
                {
                    name: `Degrees to Radians`, value: `$math degtorad <degrees>`
                },
                {
                    name: `Radians to degrees`, value: `$math radtodeg <radians>`
                },
                {
                    name: `Find Apothem of a triangle`, value: `$math apothem <degrees>`
                }
            )
            .setColor('#5AADFF')

            message.channel.send(mathHelp);
        }

        switch(args[0].toLowerCase()) {
            case 'cuberoot' || 'cbrt':
                if(!args[1]) {
                    message.channel.send('try $math help');
                    break;
                }
                functions.cubeRoot(args[1]);
                break;
            case 'squareroot' || 'sqrt':
                if(!args[1]) {
                    message.channel.send('try $math help');
                    break;
                }
                functions.cubeRoot(args[1]);
                break;
            case 'power':
                if(!args[2]) {
                    message.channel.send('try $math help');
                    break;
                }
                functions.power(args[1], args[2])
                break;
            case 'circum' || 'circumference':
                if(!args[1]) {
                    message.channel.send('try $math help');
                    break;
                }
                functions.calculateCircumference(args[1]);
                break;
            case 'degtorad':
                if(!args[1]) {
                    message.channel.send('try $math help');
                    break;
                }
                functions.degToRad(args[1]);
                break;
            case 'radtodeg':
                if(!args[1]) {
                    message.channel.send('try $math help');
                    break;
                }
                functions.radToDeg(args[1]);
                break;
            case 'apothem':
                if(!args[1]) {
                    message.channel.send('try $math help');
                    break;
                }
                functions.apothem(args[1]);
                break;
            case 'power' || 'pow':
                if(!args[2]) {
                    message.channel.send('try $math help');
                    break;
                }
                functions.power(args[1], args[2]);
                break;
            default:
                message.channel.send('what operation do you want me to perform smart one??? no wonder you need a calculator lmao.');
                break;
        }
    }
}