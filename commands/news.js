var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

module.exports = {
    name: 'news',
    description: 'news',
    aliases: ['news'],
    execute(message=message, args=args, bot=bot) {
        var request = new XMLHttpRequest();

        key = '&apiKey=1b28b79af51a4d28816452334d1dee0f'
        params = '?country=us&category=business'
        api = 'https://newsapi.org/v2/top-headlines'

        call = api + params + key

        request.open('GET', call, true)
        request.onload = function () {
            var data = JSON.parse(this.responseText);

            articleNum = Math.floor(Math.random() * 10)

            var article = JSON.stringify(data.articles[articleNum], null, 4)

            // fs.writeFile('news.txt', article, function(err) {
            //     if(err) {
            //         return console.error(err);
            //     }
            // })

            if(request.status >= 200 && request.status < 400) {
                message.channel.send(article);
            } else {
                console.log('error getting request');
            }
        }
        request.send()
    }
}