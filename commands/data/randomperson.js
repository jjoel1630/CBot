var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


module.exports = {
    name: 'Random Person Generator',
    description: 'Generates a random person',
    aliases: ['ranperson', 'rp', 'randomperson'],
    perms: null,
    active: true,
    usage: '`$rp`', 
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        var request = new XMLHttpRequest();

        var params = '?results=1';
        var api = 'https://randomuser.me/api/';

        var call = api + params;

        request.open('GET', call, true);
        request.onload = function () {
            var data = JSON.parse(this.responseText);

            const Rpembed = new Discord.MessageEmbed()
            .setTitle(`${data.results[0].name.title}. ${data.results[0].name.first} ${data.results[0].name.last}`)
            .setDescription('Random person has been generated')
            .addFields(
                {
                    name: `Location: <street>, <city>, <state>, <country> <zipcode>`, value: `${data.results[0].location.street.number} ${data.results[0].location.street.name}, ${data.results[0].location.city}, ${data.results[0].location.state}, ${data.results[0].location.country} ${data.results[0].location.postcode}`
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
                {
                    name: `** **`, value: `** **`
                },
                {
                    name: `DOB:`, value: `${data.results[0].dob.date}`, inline: true
                },
                {
                    name: `Age:`, value: `${data.results[0].dob.age}`, inline: true
                },
                {
                    name: `** **`, value: `** **`
                },
                {
                    name: `Phone`, value: `${data.results[0].phone}`, inline: true
                },
                {
                    name: `Cell`, value: `${data.results[0].cell}`, inline: true
                },
                {
                    name: `** **`, value: `** **`
                },
                {
                    name: `SSN:`, value: `${data.results[0].id.value}`, inline: true
                },
                {
                    name: `Nationality:`, value: `${data.results[0].nat}`, inline: true
                },
            )
            .setThumbnail(`${data.results[0].picture.thumbnail}`)
            .setImage(`${data.results[0].picture.large}`)
            .setTimestamp();

            message.channel.send(Rpembed);  
        }
        request.send()
    }
}