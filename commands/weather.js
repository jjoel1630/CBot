var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

module.exports = {
    name: 'weather',
    description: 'weather',
    aliases: ['weather'],
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        var request = new XMLHttpRequest();

        var key = '&appid=2f1cae5eaed2d47e492553f8036a4f34';
        var params = '?';
        var api = 'https://api.openweathermap.org/data/2.5/forecast';

        var location = args.splice(0).join(', ');
        params = `?q=${location}&units=imperial`

        var call = api + params + key;

        request.open('GET', call, true);
        request.onload = function () {
            var data = JSON.parse(this.responseText);

            const Weatherembed = new Discord.MessageEmbed()
            .setTitle(`Current Weather`)
            .setDescription(`Here is the current weather based on your given zipcode, and country code: ${location}`)
            .addFields(
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
            .setTimestamp()
            .setColor('#add8e6')
            .setFooter('Getting the wrong info? Contact the owner.');

            message.channel.send(Weatherembed);
        }
        request.send()
    }
}