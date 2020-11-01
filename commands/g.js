module.exports = {
    name : 'g', 
    description : 'g',
    execute(message, args) {
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            if(args[1]) {
                message.channel.send('Can ' + args[0] + ' and ' + args[1] + ' stop being gay pls');
                message.delete({timeout: 100}).catch(console.error);
            } else if(args[0]) {
                message.channel.send('Can ' + args[0] + ' stop being gay please');
                message.delete({timeout: 100}).catch(console.error);
            } else {
                message.channel.send('Can yall stop being gay fr');
                message.delete({timeout: 100}).catch(console.error);
            }
        } else {
            message.channel.send("lmao you don't have the perms. HAHAHAHAHA.")
            message.delete({timeout: 100}).catch(console.error);
        }

    }
}