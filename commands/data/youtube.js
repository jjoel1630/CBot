var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
    name: 'Youtube Videos',
    description: 'Gets a youtube video based on your search',
    aliases: ['ytsearch', 'ysearch', 'youtubesearch', 'ys'],
    perms: null,
    active: true,
    usage: '`$ys <keywords>`',
    cooldownTime: 60000,
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        const cooldown = cooldowns.get(message.author.id);
        if(cooldown && message.author.id !== '535671100001222668') {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in ${remaining}`)
        } else {
            
            youtube(message, args)

            cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
            setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
        }
    }
}

const youtube = (message, args) => {
    if(!args[0]) {
        message.channel.send('Bro what do you want to search for???????');
        return;
    }
    var request = new XMLHttpRequest();

    var api = 'https://www.googleapis.com/youtube/v3/search';
    var key = 'key=AIzaSyBh2EUsTZDqfPcnMcyzqfFHYiMyjMzinsE';
    
    var query = args.join('+');
    var params = `?q=${query}&${key}`;

    let call = api + params

    request.open('GET', call, true)
    request.onload = function () {
        var data = JSON.parse(this.responseText);

        let videoURL = `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;

        message.channel.send(videoURL);
    }
    request.send()
}