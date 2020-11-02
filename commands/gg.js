module.exports = {
    name : "gg",
    description : "guessinggame",
    execute(message, args, bot) {
        if(!args[0]) {
            message.reply("From 0 - wut bruh");
            message.delete({timeout: 20}).catch(console.error);
        } else {
            message.delete({timeout: 20}).catch(console.error);
            message.reply("Pick a number from " + "`" + "0 - " + args[0] + "`");
            const filter = m => m.author.id ===  message.author.id;
            message.channel.awaitMessages(filter, {
                max: 1, // leave this the same
                time: 10000, // time in MS. there are 1000 MS in a second
            }).then(async(collected) => {
                const number = Math.floor(Math.random() * args[0])
                if(collected.first().content == 'cancel'){
                    message.reply('Bruh what a simp.')
                } else if(parseInt(number) === parseInt(collected.first().content)) {
                    message.reply("Nice job!");
                } else {
                    message.reply("Lmao ure trash. The number was " + "`" + number + "`");
                }
            }).catch(() => {
                // what to do if a user takes too long goes here 
                message.reply('Slowpoke.') 
            });
        }
    }
}