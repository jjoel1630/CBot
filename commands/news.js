var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

module.exports = {
    name: 'news',
    description: 'news',
    aliases: ['news'],
    execute(message=message, args=args, bot=bot) {
        var request = new XMLHttpRequest();

        if(!args[1]) {
            message.channel.send('$news <country ex. us, ru, ch> <category ex. health, business>');
        }

        key = '&apiKey=1b28b79af51a4d28816452334d1dee0f';
        params = `?country=${args[0]}&category=${args[1]}`;
        api = `https://newsapi.org/v2/top-headlines`;

        call = api + params + key

        request.open('GET', call, true)
        request.onload = function () {
            var data = JSON.parse(this.responseText);

            if(!data) {
                message.channel.send('$news <country ex. us, ru, ch> <category ex. health, business> invaild country or category');
                return;
            }

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