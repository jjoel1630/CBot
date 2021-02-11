var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

module.exports = {
    name: 'news',
    description: 'news',
    aliases: ['news'],
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        var request = new XMLHttpRequest();

        key = '&apiKey=1b28b79af51a4d28816452334d1dee0f';
        params = ``;
        api = ``;

        if(!args[0]) {
            message.channel.send('Try $news help');
        }

        if(args[0] == 'help') {
            const Newshelpembed = new Discord.MessageEmbed()
            .setTitle('Parameters')
            .addFields(
                {
                    name: `Possible Commands`, value: `\`$news top-headlines <country (default: us)> <category (optional)>\`
                    \`$news everything <keywords>\``
                },
                {
                    name: `Type (Param 1)`, value: `\`top-headlines\` \`everything\``
                },
                {
                    name: `Countries (Param 2)`, value: `\`ae\` \`ar\` \`at\` \`au\` \`be\` \`bg\` \`br\` \`eg\` \`fr\` \`gb\` \`gr\` \`hk\` 
                    \`ca\` \`ch\` \`cn\` \`co\` \`cu\` \`cz\` \`de\` \`kr\` \`lt\` \`lv\` \`ma\` \`mx\`
                    \`hu\` \`id\` \`ie\` \`il\` \`in\` \`it\` \`jp\` \`pt\` \`ro\` \`rs\` \`ru\` \`sa\`
                    \`my\` \`ng\` \`nl\` \`no\` \`nz\` \`ph\` \`pl\` \`ua\` \`us\` \`ve\` \`za\`
                    \`se\` \`sg\` \`si\` \`sk\` \`th\` \`tr\` \`tw\``
                },
                {
                    name: `Categories (Param 3)`, value: `\`business\` \`entertainment\` \`general\` \`health\` 
                    \`science\` \`sports\` \`technology\``
                },
            );
            message.channel.send(Newshelpembed);
            return;
        }

        if(args[0] == 'everything') {
            if(args[1]) {
                key = '&apiKey=1b28b79af51a4d28816452334d1dee0f';
                params = `?q=${args.slice(1).join(' ')}`;
                api = `https://newsapi.org/v2/${args[0]}`;
            } else {
                message.channel.send('Please provide a keyword to search for your article');
            }
        } else if (args[0] == 'top-headlines') {
            params = `?country=us`;
            api = `https://newsapi.org/v2/${args[0]}`; 
            if(args[2]) {
                params = `?country=${args[1]}&category=&${args[2]}`;
                api = `https://newsapi.org/v2/${args[0]}`; 
            } else if(args[1] && args[1].length > 2) {
                params = `?country=us&category=&${args[1]}`;
                api = `https://newsapi.org/v2/${args[0]}`; 
            } else if (args[1] && args[1].length <= 2) {
                params = `?country=${args[1]}`;
                api = `https://newsapi.org/v2/${args[0]}`; 
            }
        } else {
            message.channel.send('try $news help');
        }

        call = api + params + key

        console.log(call);

        request.open('GET', call, true)
        request.onload = function () {
            try {
                var data = JSON.parse(this.responseText);

                if(!data) {
                    message.channel.send('try $news help');
                }

                articleNum = Math.floor(Math.random() * 10)

                var article = JSON.stringify(data.articles[articleNum], null, 4)

                // fs.writeFile('news.txt', article, function(err) {
                //     if(err) {
                //         return console.error(err);
                //     }
                // })

                if(request.status >= 200 && request.status < 400) {
                    const Newsembed = new Discord.MessageEmbed()
                    .setTitle(`Article Title: ${article.title}`)
                    message.channel.send(Newsembed);
                } else {
                    console.log('error getting request');
                }
            } catch(err) {
                console.error(err);
            }
        }
        request.send()
    }
}