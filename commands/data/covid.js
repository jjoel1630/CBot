const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    name: 'Covid status',
    description: 'Returns the covid-19 status for the provided arguments',
    aliases: ['covid', 'c19', 'covid-19'],
    perms: null,
    active: true,
    cooldownTime: 300000,
    usage: '`$c19 <global/(country)>`, Type $c19 help for more',
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        const cooldown = cooldowns.get(message.author.id);
        if(cooldown && message.author.id !== '535671100001222668') {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. the covid results dont update that fast dumbo. you can run this command in ${remaining}`)
		} else {

            covid(message, args, Discord);

			cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
            setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
		}
    }
}

const covid = (message, args, Discord) => {
    var request = new XMLHttpRequest();
    var api = 'https://api.covid19api.com/summary';
    var countries = '';

    if(args[0] && args[0] === 'global') {
        api = 'https://api.covid19api.com/summary'
    } else if(args[0] && args[0] === 'countries') {
        api = 'https://api.covid19api.com/countries'
    } else if(args[0] && args[0].toLowerCase() === 'country') {
        api = `https://api.covid19api.com/summary`
    }

    request.open('GET', api, true)
    request.setRequestHeader('X-Access-Token', `${process.env.COVID_API_KEY ?? process.env.H_COVID_API_KEY}`)
    request.onload = function () {
        try {
            var data = JSON.parse(this.responseText);
        } catch(err) {
            message.channel.send('There was an error processing your request. Please try again in a few minutes. If you are still facing issues, please contact the owner');
        }

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
        } else if(args[0] && args[0].toLowerCase() === 'countries') {
            for(let x = 0; x < data.length; x++) {
                countries = countries + `\`${data[x].Slug}\` `
            }
            var countriesList = countries.split(' ');
            countriesList.sort();
            var splitIndex = Math.floor(countriesList.length / 2)
            var countriesString2 = countriesList.splice(splitIndex).join(" ")
            var countriesString1 = countriesList.join(" ")

            if(!args[1] || args[1] === '1') {
                message.channel.send(countriesString1 + " page 1 of 2");
            } else if(args[1] === '2') {
                message.channel.send(countriesString2 + " page 2 of 2");
            }
        } else if(args[0] && args[0].toLowerCase() === 'country') {
            if(!args[1]) {
                message.channel.send('you need to specify a country. Try <$c19 countries> to see the available countries');
            } else {
                for(var x = 0; x < data.Countries.length; x++) {
                    if(data.Countries[x].Slug === args[1].toLowerCase()) {
                        const Countrycovidembed = new Discord.MessageEmbed()
                        .setTitle(`Covid Stats for ${data.Countries[x].Country}`)
                        .addFields(
                            {
                                name: `NewConfirmed`, value: `${data.Countries[x].NewConfirmed}`
                            },
                            {
                                name: `TotalConfirmed`, value: `${data.Countries[x].TotalConfirmed}`
                            },
                            {
                                name: `NewDeaths`, value: `${data.Countries[x].NewDeaths}`
                            },
                            {
                                name: `TotalDeaths`, value: `${data.Countries[x].TotalDeaths}`
                            },
                            {
                                name: `NewRecovered`, value: `${data.Countries[x].NewRecovered}`
                            },
                            {
                                name: `TotalRecovered`, value: `${data.Countries[x].TotalRecovered}`
                            },
                        )
                        .setTimestamp()
                        .setColor('#d64545')
                        .setThumbnail('https://ewscripps.brightspotcdn.com/dims4/default/7671677/2147483647/strip/true/crop/1303x733+15+0/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2F0a%2Ff2%2F72b1b4d94794992a0772cb593ce5%2Fscreen-shot-2020-02-25-at-10.49.27%20AM.png');
                        message.channel.send(Countrycovidembed);
                        return;
                    }
                }
                message.channel.send('Sorry, we don\'t have data for that country, try <$c19 countries> for the available countries');
            }
        }
    }
    request.send();
}