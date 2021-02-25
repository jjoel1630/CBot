const AWS = require('aws-sdk');

module.exports = {
    name: 'Set Prefix',
    description: 'you can set a prefix for the bot, the default is `$`',
    aliases: ['pre', 'prefix', 'setprefix'],
    perms: 'ADMINISTRATOR',
    active: true,
    usage: '`$setprefix <prefixname>`',
    execute(message=message, args=args, bot=bot) {
        if(message.member.hasPermission(this.perms)) {
            const prefix = args.join(' ');
            const guildID = message.guild.id;

            checkGuildPrefix(guildID, prefix, message)
        } else {
            message.channel.send(`lmaooooooooooo you dont got the perms bruva. stop tryna set my prefix without admin. admin kick this dude.`);
        }
    }
}

function addGuildAndPrefix(prefix, message) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: 'prefix',
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
            message.channel.send(`Prefix set as ${data.Attributes.prefix}`);
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
        TableName: 'prefix',
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

            if(Items) {
                changePrefix(guildID, prefix, message);
            } else {
                addGuildAndPrefix(prefix, message);
            }
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
        TableName: 'prefix',
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