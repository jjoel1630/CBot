const humanizeDuration = require('humanize-duration');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const cooldowns = new Map();


module.exports = {
    name: 'Issue command',
    description: 'create an issue/suggestion/new feature that you have with the bot',
    aliases: ['issue', 'newissue'],
    perms: null,
    active: true,
    usage: '`$issue <title>, <description>`',
    cooldownTime: 60000,
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        const cooldown = cooldowns.get(message.author.id);
        if(cooldown && message.author.id !== '535671100001222668') {
            const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
            message.channel.send(`chill bruva. my bot aint that bad that u need to spam issues. right.......? :(. you can run this command in ` + remaining)
        } else {
            
            issues(message, args);

            cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
            setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
        }
    }
}

const issues = (message, args) => {
    var request = new XMLHttpRequest();

    let i = 0;
    let spliceIndex = undefined;
    args.forEach(arg => {
        if(arg.endsWith(',')) {
            args[i] = arg.slice(0, -1);
            spliceIndex = i;
        }
        i++
    });
    if(spliceIndex === undefined) {
        message.channel.send('u need to separate ure title and description with a comma smart one');
        return;
    }
    const argsDescription = args.splice(spliceIndex + 1);
    const  description = argsDescription.join(' ');
    const title = args.join(' ');

    var call = 'https://api.github.com/repos/jjoel1630/CBot/issues';
    var bodyParams = {
        "title": title,
        "body": description
    }

    request.open('POST', call, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', `token ${process.env.GITHUB_TOKEN ?? process.env.H_GITHUB_TOKEN}`);
    request.onload = function () {
        try {
            message.channel.send('new issue created');
        } catch(err) {
            console.log(err);
            message.channel.send('There was an error creating your issue');
        }
    }
    request.send(JSON.stringify(bodyParams));
}