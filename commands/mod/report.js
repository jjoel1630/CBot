const AWS = require('aws-sdk');
const humanizeDuration = require('humanize-duration')

const cooldowns = new Map();


module.exports = {
    name: 'Report',
    description: 'report the mentioned user',
    aliases: ['report'],
    perms: 'ADMINISTRATOR',
    active: true,
    usage: '`$report <@user> <title>, <description>`',
    cooldownTime: 60000,
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        const cooldown = cooldowns.get(message.author.id);
        if(cooldown && message.author.id !== '535671100001222668') {
            const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
            message.channel.send(`chill bruva. you can run this command in ` + remaining)
        } else {
            
            report(message, args);

            cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
            setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
        }
    }
}

const report = (message, args) => {
    if(message.member.hasPermission(this.perms)) {
        if(!args[1]) {message.channel.send(`Please try ${this.usage}`); return;}
        
        const userMentioned = message.mentions.users.first()?.id;
        const guildID = message.guild.id;
        const userMentionedName = message.mentions.users.first()?.tag;

        if(args[1] && args[1] === 'server' && args[0] === 'get') {
            getGuildReports(guildID, message)
            return;
        } else if(args[1] && userMentioned && args[0] === 'get') {
            getUserReports(guildID, userMentioned, userMentionedName, message);
        } else if(args[1] && args[0] === 'delete') {
            deleteReport(message, args);
        } else {
            if(!message.mentions?.users?.first()?.id) {
                message.channel.send('u need to specify someone to report dumbo');
                return;
            }
            args.shift();
            
            let i = 0;
            let spliceIndex = undefined;
            args.forEach(arg => {
                if(arg.endsWith(',')) {
                    args[i] = arg.slice(0, -1);
                    spliceIndex = i;
                }
                i++
            });
            if(spliceIndex === undefined) {
                message.channel.send('u need to separate ure title and description with a comma smart one');
                return;
            }
            const argsTitle = args.splice(spliceIndex + 1);
            const  descriptionOfReport = argsTitle.join(' ');
            const titleOfReport = args.join(' ');

            checkGuildReports(guildID, userMentioned, userMentionedName, titleOfReport, descriptionOfReport, message);
        }
    } else {
        message.channel.send('lmaoooooooo you dont have the perms. tryna report people. hey admins boot this kid bruh');
    }
}

function checkGuildReports(guildID, userMentioned, userMentionedName, titleOfReport, descriptionOfReport, message) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: 'guildSettings',
        // ProjectionExpression:"#reports",
        FilterExpression: "guildID = :gID",
        ExpressionAttributeValues: {
            ":gID": guildID
        },
        // ExpressionAttributeNames: {
        //     "#reports": "reports",
        // }
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

            if(Items[0]?.reports) {
                addGuildReport(guildID, userMentioned, userMentionedName, titleOfReport, descriptionOfReport, message);
            } else if(!Items[0]) {
                addGuildAndReport(guildID, userMentioned, userMentionedName, titleOfReport, descriptionOfReport, message);
            } else {
                addReportDoc(guildID, userMentioned, userMentionedName, titleOfReport, descriptionOfReport, message);
            }
        }
    });
}

function addReportDoc(guildID, userMentioned, userMentionedName, titleOfReport, descriptionOfReport, message) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: 'guildSettings',
        Key: {
            "guildID": guildID
        },
        UpdateExpression: 'set reports = :report',
        ExpressionAttributeValues: {
            ':report' : [
                {
                    userID: userMentioned,
                    username: userMentionedName,
                    title: titleOfReport,
                    description: descriptionOfReport
                }
            ]
        }
    };

    // Call DynamoDB to add the item to the table
    docClient.update(params, function (err, data) {
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
            message.channel.send('added new report');
        }
    });
}

function addGuildAndReport(guildID, userMentioned, userMentionedName, titleOfReport, descriptionOfReport, message) {
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
            reports: [
                {
                    userID: userMentioned,
                    userName: userMentionedName,
                    title: titleOfReport,
                    description: descriptionOfReport
                }
            ]
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
            message.channel.send('added new report');
        }
    });
}

function getUserReports(guildID, userMentioned, userMentionedName, message) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: 'guildSettings',
        ProjectionExpression:"#reports",
        FilterExpression: "guildID = :gID",
        ExpressionAttributeValues: {
            ":gID": guildID,
        },
        ExpressionAttributeNames: {
            "#reports": "reports",
        }
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

            try {
                let i = 1;
                var reportString = `Reports for ${userMentionedName}:`;
                Items[0].reports.forEach(report => {
                    if(report.userID === userMentioned) {
                        reportString = `${reportString}\n**Report #${i}** - \`Name: ${report.title}\`, \`Description: ${report.description}\``;
                        i++;
                    }
                });
            } catch(err) {
                message.channel.send('this server has no data yet, try adding a report');
                return;
            }

            if(reportString === `Reports for ${userMentionedName}:`) {
                message.channel.send('no reports for this user');
                return;
            }

            message.channel.send(reportString);
        }
    });
}

function getGuildReports(guildID, message) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: 'guildSettings',
        ProjectionExpression:"#reports",
        FilterExpression: "guildID = :gID",
        ExpressionAttributeValues: {
            ":gID": guildID
        },
        ExpressionAttributeNames: {
            "#reports": "reports",
        }
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

            let i = 1;
            var reportString = 'Reports for this server:';
            Items[0].reports?.forEach(report => {
                reportString = `${reportString}\n**Report #${i}** - \`User: ${report.userName}\`, \`Name: ${report.title}\`, \`Description: ${report.description}\``
                i++;
            });

            if(reportString === `Reports for this server:`) {
                message.channel.send('no reports for this server');
                return;
            }

            message.channel.send(reportString);
        }
    });
}

function addGuildReport(guildID, userMentioned, userName, titleOfReport, descriptionOfReport, message) {
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
        UpdateExpression: "SET #reports = list_append(#reports, :newreport)",
        ExpressionAttributeNames: {
            "#reports": "reports"
        },
        ExpressionAttributeValues:{
            ":newreport": [{
                userID: userMentioned,
                userName: userName,
                title: titleOfReport,
                description: descriptionOfReport
            }]
        },
        ReturnValues:"UPDATED_NEW"
    };

    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            message.channel.send('added new report'); //JSON.stringify(data, null, 2)
        }
    });
}

function deleteReport(message, args) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();

    var index = args[1] - 1;
    var params = {
        TableName: 'guildSettings',
        Key:{
            "guildID": message.guild.id,
        },
        UpdateExpression: `REMOVE reports[${index}]`,
        // ConditionExpression: ":age >= :limitAge",
        // ExpressionAttributeValues:{
        //     ":index": args[1]
        // },
        ReturnValues:"UPDATED_NEW"
    };
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            message.channel.send('deleted report');
            // console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}