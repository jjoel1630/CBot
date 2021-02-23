const fs = require('fs');
const test = require('../../whitelist.json')

module.exports = {
    name: 'Whitelist',
    description: 'only owner can whitelist people from using the bot',
    aliases: ['whitelist'],
    perms: null,
    active: true,
    usage: '`only the owner can run this command`',
    execute(message=message, args=args, bot=bot) {
        if(message.member.id === '535671100001222668') {
            if(!args[0]) {
                message.channel.send('look joel, ik u designed me and sheet, but bruv who tf do u want to goddamn whitelist man. i thot u were smarter than that.');
                return;
            }
            var whitelistedUser = {
                name: `${mentions?.users?.first()?.tag}`,
                id: `${mentions?.users?.first()?.id}`,
                username: `${mentions?.users?.first()?.username}`
            }
            pushToFile(whitelistedUser);
        } else {
            message.channel.send('are you the goddamn owner of the bot??? no you arent. so y tf u runnin this command idiot???')
        }
    }
}

function writeInFile(data) {
    fs.writeFile("../../whitelist.json", data, (err) => {
        if (err) console.error(err);
        console.log("Successfully Written to File.");
    });   
}

function pushToFile(obj) {
    fs.readFile("../../whitelist.json", "utf-8", (err, data) => {
        if (err) console.error(err);
        let dataObj = JSON.parse(data);
        dataObj.whiteListedUsers.push(obj);
        
        writeInFile(JSON.stringify(dataObj));
    });
}

function readFile() {
    fs.readFile("../../whitelist.json", "utf-8", (err, data) => {
        if (err) console.error(err);
        let dataObj = JSON.parse(data);
        
        return dataObj;
    });
}
