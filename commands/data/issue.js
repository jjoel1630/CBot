const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
    name: 'Issue command',
    description: 'create an issue/suggestion/new feature that you have with the bot',
    aliases: ['issue', 'new issue'],
    perms: null,
    active: false,
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

}