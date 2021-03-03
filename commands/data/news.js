var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
    name: 'News',
    description: 'Returns the the lastest news on a given argument',
    aliases: ['news'],
    perms: null,
    active: true,
    usage: '`$news everything <keywords>`, `$news top-headlines <country (default: us)> <category (optional)>`, Type $news help for more info`',
    cooldownTime: 120000,
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        const cooldown = cooldowns.get(message.author.id);
        if(cooldown && message.author.id !== '535671100001222668') {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. the news doesnt update that fast smart one. you can run this command in ${remaining}`)
        } else {

            news(message, args, Discord)
            
            cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
            setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
        }
    }
}

const news = (message, args, Discord) => {
    var request = new XMLHttpRequest();

    key = '&apiKey=1b28b79af51a4d28816452334d1dee0f';
    params = ``;
    api = ``;

    if(args[0] === 'help') {
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
            params = `?country=${args[1]}&category=${args[2]}`;
            api = `https://newsapi.org/v2/${args[0]}`; 
        } else if(args[1] && args[1].length > 2) {
            params = `?country=us&category=${args[1]}`;
            api = `https://newsapi.org/v2/${args[0]}`; 
        } else if (args[1] && args[1].length <= 2) {
            params = `?country=${args[1]}`;
            api = `https://newsapi.org/v2/${args[0]}`; 
        }
    } else if (!args[0]) {
        params = `?country=us`;
        api = `https://newsapi.org/v2/top-headlines`; 
    } else {
        message.channel.send('Try $news help');
        return;
    }

    call = api + params + key

    console.log(call);

    request.open('GET', call, true)
    request.onload = function () {
        try {
            var data = JSON.parse(this.responseText);

            if(!data) {
                console.log('try $news help');
                return;
            }

            articleNum = Math.floor(Math.random() * 10)

            var article = JSON.stringify(data.articles[articleNum], null, 4)
            var articleSource = JSON.stringify(data.articles[articleNum].source.name, null, 4)
            var articleAuthor = JSON.stringify(data.articles[articleNum].author, null, 4)
            var articleTitle = JSON.stringify(data.articles[articleNum].title, null, 4)
            var articleDescription = JSON.stringify(data.articles[articleNum].description, null, 4)
            var articleUrl = JSON.stringify(data.articles[articleNum].url, null, 4)
            var articleImage = JSON.stringify(data.articles[articleNum].urlToImage, null, 4)
            var articleTime = JSON.stringify(data.articles[articleNum].publishedAt, null, 4)
            var articleContent = JSON.stringify(data.articles[articleNum].content, null, 4)


            articleImage = articleImage.slice(0, -1);
            articleImage = articleImage.substring(1);
            articleUrl = articleUrl.slice(0, -1);
            articleUrl = articleUrl.substring(1);
            const Newsembed = new Discord.MessageEmbed()
            .setTitle(`Article Title: ${articleTitle}`)
            .setURL(articleUrl)
            .setDescription(`**Description:** ${articleDescription}`)
            .setImage(articleImage)
            .addFields(
                {
                    name: `From`, value: `${articleSource}`
                },
                {
                    name: `Published at:`, value: `${articleTime}`
                },
                {
                    name: `By:`, value: `${articleAuthor}`
                },
                {
                    name: `Content:`, value: `${articleContent}`
                },
            )
            message.channel.send(Newsembed);
        } catch(err) {
            console.error(err);
        }
    }
    request.send()
}