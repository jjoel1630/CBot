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
            message.channel.send(`chill bruva like my bot aint that bad that u need to spam issues. right.......? :(. you can run this command in ` + remaining)
        } else {
            
            issues(message, args);

            cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
            setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
        }
    }
}

const issues = (message, args) => {
    var request = new XMLHttpRequest();

    var call = 'https://api.github.com/repos/jjoel1630/CBot/issues';
    var bodyParams = {
        "title": "this is a title",
        "body": "this is a description"
    }

    message.channel.send('sent request');

    // request.open('POST', call, true);
    // request.setRequestHeader('Content-Type', 'application/json');
    // request.setRequestHeader('Authorization', `token ${process.env.GITHUB_TOKEN ?? process.env.H_GITHUB_TOKEN}`);
    // request.onload = function () {
    //     try {
    //         message.channel.send('new issue created');
    //     } catch(err) {
    //         console.log(err);
    //         message.channel.send('There was an error sending your issue');
    //     }
    // }
    // request.send(JSON.stringify(bodyParams));
}