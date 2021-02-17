var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

module.exports = {
    name: 'weather',
    description: 'weather',
    aliases: ['weather'],
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        var request = new XMLHttpRequest();

        if(args[0].toLowerCase() === 'help') {
            message.channel.send('$weather <zip code> <2 letter country (ISO alpha-2) code>');
        } 

        if(!args[1]) {
            message.channel.send('try $weather help');
            return;
        }

        var key = '&appid=2f1cae5eaed2d47e492553f8036a4f34';
        var params = '?';
        var api = 'https://api.openweathermap.org/data/2.5/forecast';

        var location = args.splice(0).join(', ');
        params = `?q=${location}&units=imperial`

        var call = api + params + key;

        request.open('GET', call, true);
        request.onload = function () {
            try {
                var data = JSON.parse(this.responseText);

                var locations = location.split(", ");

                const Weatherembed = new Discord.MessageEmbed()
                .setTitle(`Current Weather`)
                .setDescription(`Current weather based on your given zipcode, and country code: \`${locations[0]}\` \`${locations[1]}\``)
                .addFields(
                    {
                        name: `** **`, value: `** **`
                    },
                    {
                        name: `Temperature`, value: `${data.list[0].main.temp}° F`, inline: true
                    },
                    {
                        name: `Min temp`, value: `${data.list[0].main.temp_min}° F`, inline: true
                    },
                    {
                        name: `Max temp`, value: `${data.list[0].main.temp_max}° F`, inline: true
                    },
                    {
                        name: `** **`, value: `** **`
                    },
                    {
                        name: `Weather`, value: `${data.list[0].weather[0].main}`, inline: true
                    },
                    {
                        name: `Weather description`, value: `${data.list[0].weather[0].description}`, inline: true
                    },
                    {
                        name: `Wind speed`, value: `${data.list[0].wind.speed} mph`, inline: true
                    },
                )
                .addField('** **', '** **', true)
                .setColor('#add8e6')
                .setFooter('Getting the wrong info? Contact the owner.')
                .addField('** **', '** **', true)
                .setTimestamp()

                message.channel.send(Weatherembed);
            } catch(err) {
                console.error(err);
                message.channel.send('There was an error processing your request. Try $weather help');
            }
        }
        request.send()
    }
}