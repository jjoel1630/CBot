const help = require("./help");

module.exports = {
    name: 'covid',
    description: 'covid',
    aliases: ['covid', 'c19'],
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

        var request = new XMLHttpRequest();
        var api = 'https://api.covid19api.com/summary'
        var countries = ''

        if(args[0] && args[0] === 'global') {
            api = 'https://api.covid19api.com/summary'
        } else if(args[0] && args[0] === 'countries') {
            api = 'https://api.covid19api.com/countries'
        }

        request.open('GET', api, true)
        request.setRequestHeader('X-Access-Token', '5cf9dfd5-3449-485e-b5ae-70a60e997864')
        request.onload = function () {
            var data = JSON.parse(this.responseText);

            if(args[0] && args[0] === 'global') {
                const Globalembed = new Discord.MessageEmbed()
                .setTitle('Global Covid Summary')
                .setTimestamp()
                .addFields(
                    {
                        name: `NewConfirmed`, value: `${data.Global.NewConfirmed}`
                    },
                    {
                        name: `TotalConfirmed`, value: `${data.Global.TotalConfirmed}`
                    },
                    {
                        name: `NewDeaths`, value: `${data.Global.NewDeaths}`
                    },
                    {
                        name: `TotalDeaths`, value: `${data.Global.TotalDeaths}`
                    },
                    {
                        name: `NewRecovered`, value: `${data.Global.NewRecovered}`
                    },
                    {
                        name: `TotalRecovered`, value: `${data.Global.TotalRecovered}`
                    },
                )
                .setColor('#d64545')
                .setThumbnail('https://ewscripps.brightspotcdn.com/dims4/default/7671677/2147483647/strip/true/crop/1303x733+15+0/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2F0a%2Ff2%2F72b1b4d94794992a0772cb593ce5%2Fscreen-shot-2020-02-25-at-10.49.27%20AM.png');

                message.channel.send(Globalembed);
            }else if(args[0] && args[0].toLowerCase() === 'countries') {
                for(let x = 0; x < data.length; x++) {
                    countries = countries + `\`${data[x].Slug}\` `
                }
                var countriesList = countries.split(' ');
                var splitIndex = Math.floor(countriesList.length / 2)
                var countriesString1 = countriesList.splice(splitIndex).join(" ")
                var countriesString2 = countriesList.join(" ")

                if(!args[1] || args[1] === '1') {
                    const Countries1 = Discord.MessageEmbed()
                    .setTitle('Acceptable countries')
                    .addFields(
                        {
                            name: `Countries`, value: `${countriesString1}`
                        },
                    )
                    .setFooter('Page 1 of 2');

                    message.channel.send(Countries1);
                } if(args[1] === '2') {
                    const Countries2 = Discord.MessageEmbed()
                    .setTitle('Acceptable countries')
                    .addFields(
                        {
                            name: `Countries`, value: `${countriesString2}`
                        },
                    )
                    .setFooter('Page 1 of 2');

                    message.channel.send(Countries2);
                }
            }
        }
        request.send()
    }
}