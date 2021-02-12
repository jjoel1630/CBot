var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    name: 'youtube',
    description: 'gets youtube vids',
    aliases: ['ytsearch', 'ysearch', 'youtubesearch', 'ys'],
    execute(message=message, args=args, bot=bot) {
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