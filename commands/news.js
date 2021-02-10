var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

module.exports = {
    name: 'news',
    description: 'news',
    aliases: ['news'],
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        var request = new XMLHttpRequest();

        // if(!args[1]) {
        //     message.channel.send('$news <country ex. us, ru, ch> <category ex. health, business>');
        //     return;
        // }

        // defaultCountry = 'us';
        // defaultCategory = '&category=business';

        // if(!args[3]) {
        //     defaultCategory = '';
        // }

        // if(args[0] === 'top' || 'topheadlines') {
        //     args[0] = 'top-headlines';
        // }

        if(args[0] == 'help') {
            const Newsembed = new Discord.MessageEmbed()
            .setTitle('Valid Countries:')
            .addFields(
                {
                    name: `Countries`, value: `\`ae\` \`ar\` \`at\` \`au\` \`be\` \`bg\` \`br\` 
                    \`ca\` \`ch\` \`cn\` \`co\` \`cu\` \`cz \`de\` \`eg\` \`fr\` \`gb\` \`gr\` \`hk\` 
                    \`hu\` \`id\` \`ie\` \`il\` \`in\` \`it\` \`jp\` \`kr\` \`lt\` \`lv\` \`ma\` \`mx\`
                    \`my\` \`ng\` \`nl\` \`no\` \`nz\` \`ph\` \`pl\` \`pt\` \`ro\` \`rs\` \`ru\` \`sa\` 
                    \`se\` \`sg\` \`si\` \`sk\` \`th\` \`tr\` \`tw\` \`ua\` \`us\` \`ve\` \`za\``
                },
            );
            message.channel.send(Newsembed);
            return;
        }

        if(!args[2]) {
            message.channel.send('$news <country ex. us, ru, ch> <category ex. health, business>');
            message.channel.send('valid countries: ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za');
        }

        key = '&apiKey=1b28b79af51a4d28816452334d1dee0f';
        params = `?country=${args[1] || defaultCountry}${defaultCategory}`;
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