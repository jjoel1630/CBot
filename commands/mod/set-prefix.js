const humanizeDuration = require('humanize-duration')
const AWS = require('aws-sdk')

const cooldowns = new Map();


module.exports = {
    name: 'Set Prefix',
    description: 'you can set a prefix for the bot, the default is `$`',
    aliases: ['pre', 'prefix', 'setprefix'],
    perms: 'ADMINISTRATOR',
    active: true,
    usage: '`$setprefix <prefixname>`',
    cooldownTime: 60000,
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        const cooldown = cooldowns.get(message.author.id);
        if(cooldown && !message.author.id === '535671100001222668') {
            const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
            message.channel.send(`chill bruva. you can run this command in ` + remaining)
        } else {
            
            if(message.member.hasPermission(this.perms)) {
                const prefix = args.join(' ');
                const guildID = message.guild.id;
    
                checkGuildPrefix(guildID, prefix, message)
            } else {
                message.channel.send(`lmaooooooooooo you dont got the perms bruva. stop tryna set my prefix without admin. admin kick this dude.`);
            }

            cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
            setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
        }
    }
}

function addGuildAndPrefix(guildID, prefix, message) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: 'guildSettings',
        Item: {
            guildID: guildID,
            prefix: prefix
        }
    };

    // Call DynamoDB to add the item to the table
    docClient.put(params, function (err, data) {
        if (err) {
            console.log({
                success: false,
                message: err
            });
        } else {
            // console.log({
            //     success: true,
            //     message: 'Added element',
            //     data: data
            // });
            message.channel.send(`Prefix set as ${prefix}`);
        }
    });
}

function checkGuildPrefix(guildID, prefix, message) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: 'guildSettings',
        ProjectionExpression:"prefix",
        FilterExpression: "guildID = :gID",
        ExpressionAttributeValues: {
            ":gID": guildID
        },
    };

    docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err);
            return({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;

            if(Items[0]?.prefix) {
                changePrefix(guildID, prefix, message);
                // addGuildAndPrefix(prefix, message);
            } else if(!Items[0]) {
                addGuildAndPrefix(guildID, prefix, message);
                // changePrefix(guildID, prefix, message);
            } else {
                addPrefixDoc(prefix, guildID, message);
            } 
        }
    });
}

function addPrefixDoc(prefix, guildID, message) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();
    
    var params = {
        TableName: 'guildSettings',
        Key:{
            "guildID": guildID,
        },
        UpdateExpression: "SET #prefix = :newprefix",
        ExpressionAttributeNames: {
            "#prefix": "prefix"
        },
        ExpressionAttributeValues:{
            ":newprefix": prefix 
        },
        ReturnValues:"UPDATED_NEW"
    };

    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            message.channel.send(`Set new prefix to ${data.Attributes.prefix}`); //JSON.stringify(data, null, 2)
        }
    });
}

function changePrefix(guildID, prefix, message) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();
    
    var params = {
        TableName: 'guildSettings',
        Key:{
            "guildID": guildID,
        },
        UpdateExpression: "SET #prefix = :newprefix",
        ExpressionAttributeNames: {
            "#prefix": "prefix"
        },
        ExpressionAttributeValues:{
            ":newprefix": prefix 
        },
        ReturnValues:"UPDATED_NEW"
    };

    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            message.channel.send(`Set new prefix to ${data.Attributes.prefix}`); //JSON.stringify(data, null, 2)
        }
    });
}