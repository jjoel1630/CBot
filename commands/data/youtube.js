var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    name: 'Youtube Videos',
    description: 'Gets a youtube video based on your search',
    aliases: ['ytsearch', 'ysearch', 'youtubesearch', 'ys'],
    perms: null,
    active: true,
    usage: '`$ys <keywords>`',
    execute(message=message, args=args, bot=bot) {
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
}