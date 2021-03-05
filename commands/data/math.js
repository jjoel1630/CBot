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
            .addFields(
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
            return;
        }

        if(args[1] && !parseFloat(args[1])) {
            message.channel.send('you gotta gimme a valid number dumbo');
            return;
        }

        if(args[2] && !parseFloat(args[2])) {
            message.channel.send('you gotta gimme a valid number dumbo');
            return;
        }

        switch(args[0].toLowerCase()) {
            case 'cuberoot':
            case 'cbrt':
                console.log('cbrt');
                if(!args[1]) {
                    message.channel.send('try $math help');
                    break;
                }
                message.channel.send(cubeRoot(args[1]));
                break;
            case 'squareroot':
            case 'sqrt':
                if(!args[1]) {
                    message.channel.send('try $math help');
                    break;
                }
                message.channel.send(squareRoot(args[1]));
                break;
            case 'circum':
            case 'circumference':
                if(!args[1]) {
                    message.channel.send('try $math help');
                    break;
                }
                message.channel.send(calculateCircumference(args[1]));
                break;
            case 'degtorad':
                if(!args[1]) {
                    message.channel.send('try $math help');
                    break;
                }
                message.channel.send(degToRad(args[1]));
                break;
            case 'radtodeg':
                if(!args[1]) {
                    message.channel.send('try $math help');
                    break;
                }
                message.channel.send(radToDeg(args[1]));
                break;
            case 'apothem':
                if(!args[1]) {
                    message.channel.send('try $math help');
                    break;
                }
                message.channel.send(apothem(args[1]));
                break;
            case 'power':
            case 'pow':
                if(!args[2]) {
                    message.channel.send('try $math help');
                    break;
                }
                message.channel.send(power(args[1], args[1]));
                break;
            default:
                message.channel.send('what operation do you want me to perform smart one??? no wonder you need a calculator lmao. (get it. cuz ure that dumb. NVM)');
                break;
        }
    }
}

const calculateCircumference = (radius) => {
    return 2 * Math.PI * radius;
}

const degToRad = (deg) => {
    return deg * (Math.PI / 180);
}

const radToDeg = (rad) => {
    return rad / (Math.PI / 180);
}

const apothem = (deg) => {
    return 50 * Math.tan(this.degToRag(deg));
}

const cubeRoot = (number) => {
    return Math.cbrt(number);
}

const squareRoot = (number) => {
    return Math.sqrt(number);
}

const power = (x, y) => {
    return Math.pow(x, y);
}