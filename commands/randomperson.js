var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


module.exports = {
    name: 'randomperson',
    description: 'randomperson',
    aliases: ['ranperson', 'rp', 'randomperson'],
    execute(message=message, args=args, bot=bot) {
        var request = new XMLHttpRequest();

        var params = '?results=1';
        var api = 'https://randomuser.me/api/';

        var call = api + params;

        request.open('GET', call, true);
        request.onload = function () {
            var data = JSON.parse(this.responseText);

            message.channel.send(data[0]);  
        }
        request.send()
    }
}