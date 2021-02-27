module.exports = {
    name: 'Server info',
    description: 'returns the server info for the current server',
    aliases: ['sinfo', 'serverinfo'],
    perms: null,
    active: true,
    usage: "`$sinfo`",
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        
    }
}

const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
    name: 'Server info',
    description: 'returns the server info for the current server',
    aliases: ['sinfo', 'serverinfo'],
    perms: null,
    active: true,
    usage: "`$sinfo`",
    cooldownTime: 10000,
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        const cooldown = cooldowns.get(message.author.id);
        if(cooldown && !message.author.id === '535671100001222668') {
			const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
			message.channel.send(`chill bruva. you can run this command in ${remaining}`)
        } else {

            sinfo(message, args)
            
            cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
            setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
        }
    }
}

const sinfo = (message, args, Discord) => {
    const { guild } = message;

    const { name, region, memberCount, owner, createdAt } = guild;

    const dateCreated = createdAt.toString().split(" ");

    month = dateCreated[1];
    year = dateCreated[3];
    day = dateCreated[0];
    date = dateCreated[2];

    if(args[0]) {
        switch(args[0].toLowerCase()) {
            case "name":
                message.channel.send(name);
                break;
            case "region":
                message.channel.send(region);
                break;
            case "members":
                message.channel.send(memberCount);
                break;
            case "owner":
                message.channel.send(owner.user.tag);
                break;
            case "created":
                message.channel.send(`${day} ${month} ${date}, ${year}`);
                break;
            default:
                message.channel.send("What info do you want me to get???");
        }
    } else {
        const sinfoEmbed = new Discord.MessageEmbed()
        .setTitle(`${name} info`)
        .addFields(
            {
                name: `Name:`, value: `${name}`
            },
            {
                name: `Region:`, value: `${region}`
            },
            {
                name: `Members:`, value: `${memberCount}`
            },
            {
                name: `Owner:`, value: `${owner.user.tag}`
            },
            {
                name: `Created on`, value: `${day} ${month} ${date}, ${year}`
            } 
        )
        .setThumbnail(guild.iconURL());

        message.channel.send(sinfoEmbed);
    }
}