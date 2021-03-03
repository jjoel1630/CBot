const humanizeDuration = require('humanize-duration');
const wordsList = require('./ftgwords.json');

const cooldowns = new Map();


module.exports = {
    name: 'Fast type game',
    description: 'you are given a word, whoever types it first wins',
    aliases: ['ftg'],
    perms: null,
    active: true,
    usage: '`$ftg <difficulty from 0-6>`',
    cooldownTime: 60000,
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        const cooldown = cooldowns.get(message.author.id);
        if(cooldown && message.author.id !== '535671100001222668') {
            const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
            message.channel.send(`chill bruva. you can run this command in ${remaining}`)
        } else {

            ftg(message, args);
            
            cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
            setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
        }
    }
}

const ftg = (message, args) => {
    if(args[0] == 6) {
        message.channel.send('Playing difficulty dumbaf');        
        message.channel.send(wordsList.list[6].words[0]);
        return;
    }
    // const number = Math.floor(Math.random() * 6);
    const filter = m => m.content === wordsList.list[args[0]].words[0];
    message.channel.send(`Playing difficulty \`${wordsList.list[args[0]].difficulty}\`\nType \`${wordsList.list[args[0]].words[0]}\``).then(() => {
        message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
            .then(collected => {
                message.channel.send(`<@!${collected.first().author.id}> \`${wordsList.list[args[0]].succesMsg}\``);
            })
            .catch(collected => {
                message.channel.send(wordsList.list[args[0]].slowMsg);
            })
    })
}