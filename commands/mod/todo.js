const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
    name: 'Todo List',
    description: 'you can add items to your todo list',
    aliases: ['todo'],
    perms: 'ADMINISTRATOR',
    active: true,
    usage: '`$todo <command (add, delete, etc)> title, description, time`',
    cooldownTime: 60000,
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        const cooldown = cooldowns.get(message.author.id);
        if(cooldown && !message.author.id === '535671100001222668') {
            const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
            message.channel.send(`chill bruva. you can run this command in ` + remaining)
        } else {

            todo(message, args);
            
            cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
            setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
        }
    }
}

const todo = (message, args) => {
    if(!args[3]) {
        message.channel.send(this.usage);
        return;
    }
}