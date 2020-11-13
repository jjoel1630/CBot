module.exports = {
    name: 'serverinfo',
    description: 'serverinfo',
    aliases: ['sinfo', 'serverinfo'],
    execute(message=message, args=args, bot=bot, Discord=Discord) {
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
}