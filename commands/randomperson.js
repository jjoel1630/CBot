var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


module.exports = {
    name: 'randomperson',
    description: 'randomperson',
    aliases: ['ranperson', 'rp', 'randomperson'],
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        var request = new XMLHttpRequest();

        var params = '?results=1';
        var api = 'https://randomuser.me/api/';

        var call = api + params;

        request.open('GET', call, true);
        request.onload = function () {
            var data = JSON.parse(this.responseText);

            const Rpembed = new Discord.MessageEmbed()
            .setTitle(`Random Person Genned: ${data.results[0].name.title}. ${data.results[0].name.first} ${data.results[0].name.last}`)
            .addFields(
                {
                    name: `Location:`, value: `${data.results[0].location.street.number} ${data.results[0].location.street.name}, ${data.results[0].location.city}, ${data.results[0].location.state} ${data.results[0].location.country} ${data.results[0].location.postcode}`
                },
                {
                    name: `Email:`, value: `${data.results[0].email}`, inline: true
                },
                {
                    name: `Username:`, value: `${data.results[0].login.username}`, inline: true
                },
                {
                    name: `Password:`, value: `${data.results[0].login.password}`, inline: true
                },
            )
            .setImage(`${data.results[0].picture.medium}`)

            message.channel.send(Rpembed);  
        }
        request.send()
    }
}