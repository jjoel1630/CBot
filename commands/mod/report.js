const AWS = require('aws-sdk');

module.exports = {
    name: 'Report',
    description: 'report the mentioned user',
    aliases: ['report'],
    perms: 'ADMINISTRATOR',
    active: true,
    usage: '`$report <@user> <title>,<description>`',
    execute(message=message, args=args, bot=bot) {
        if(message.member.hasPermission(this.perms)) {
            if(!args[1]) {message.channel.send(`Please try ${this.usage}`); return;}
            
            const userMentioned = message.mentions.users.first()?.id;
            const guildID = message.guild.id;
            const userMentionedName = message.mentions.users.first()?.tag;
            const [ titleOfReport, descriptionOfReport ] = args[1].split(',');

            if(args[1] && args[1] === 'server' && args[0] === 'get') {
                getGuildReports(guildID, message)
                return;
            } else if(args[1] && userMentioned && args[0] === 'get') {
                getUserReports(guildID, userMentioned, userMentionedName, message);
            } else if(titleOfReport && descriptionOfReport) {
                checkGuildReports(guildID, userMentioned, userMentionedName, titleOfReport, descriptionOfReport);
            }
        } else {
            message.channel.send('lmaoooooooo you dont have the perms. tryna report people. hey admins boot this kid man');
        }
    }
}

function updateEntry(userMentioned, titleOfReport, descriptionOfReport) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    var dynamodb = new AWS.DynamoDB();
    const docClient = new AWS.DynamoDB.DocumentClient();
    
    var params = {
        TableName: 'reports',
        Key:{
            "userID": userMentioned,
        },
        UpdateExpression: "SET #reports = list_append(#reports, :newreport)",
        ExpressionAttributeNames: {
            "#reports": "reports"
        },
        ExpressionAttributeValues:{
            ":newreport": [{
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
            console.log("UpdateItem succeeded"); //JSON.stringify(data, null, 2)
        }
    });

}

function checkUserReports(userMentioned, titleOfReport, descriptionOfReport) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();
    var dynamodb = new AWS.DynamoDB();

    const params = {
        TableName: 'reports',
        ProjectionExpression:"#reports",
        FilterExpression: "userID = :id",
        ExpressionAttributeValues: {
            ":id": userMentioned
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

            console.log(data);

            if(Items[0]) {
                updateEntry(userMentioned, titleOfReport, descriptionOfReport);
            } else {
                addNewReportAndUser(userMentioned, titleOfReport, descriptionOfReport);
            }
        }
    });
}

function getUserReports(userMentioned, message) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();
    var dynamodb = new AWS.DynamoDB();

    const params = {
        TableName: 'reports',
        ProjectionExpression:"#reports",
        FilterExpression: "userID = :id",
        ExpressionAttributeValues: {
            ":id": userMentioned
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
            var reportString = '';
            Items[0].reports.forEach(report => {
                reportString = `${reportString}\nReport #${i} - Name: ${report.title} Description: ${report.description}`
                i++;
            });

            message.channel.send(reportString);
        }
    });
}

function addNewReportAndUser(titleOfReport, descriptionOfReport, userMentioned) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();
    var dynamodb = new AWS.DynamoDB();
    
    var params = {
        TableName: 'reports',
        Item: {
            userID: userMentioned,
            reports: [
                {
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
        } //else {
        //     console.log({
        //         success: true,
        //         message: 'Added element',
        //         data: data
        //     });
        // }
    });
}

function addGuildAndReport(guildID, userMentioned, userMentionedName, titleOfReport, descriptionOfReport) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: 'reports',
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
        TableName: 'reports',
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

            let i = 1;
            var reportString = `Reports for ${userMentionedName}:`;
            Items[0].reports.forEach(report => {
                if(report.userID === userMentioned) {
                    reportString = `${reportString}\n**Report #${i}** - \`Name: ${report.title}\`, \`Description: ${report.description}\``;
                }
                i++;
            });

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
        TableName: 'reports',
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
            Items[0].reports.forEach(report => {
                reportString = `${reportString}\n**Report #${i}** - \`User: ${report.userName}\`, \`Name: ${report.title}\`, \`Description: ${report.description}\``
                i++;
            });

            if(reportString === `Reports for this server:`) {
                message.channel.send('no reports for this user');
                return;
            }

            message.channel.send(reportString);
        }
    });
}

function checkGuildReports(guildID, userMentioned, userMentionedName, titleOfReport, descriptionOfReport) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: 'reports',
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

            if(Items[0]) {
                addGuildReport(guildID, userMentioned, userMentionedName, titleOfReport, descriptionOfReport);
            } else {
                addGuildAndReport(guildID, userMentioned, userMentionedName, titleOfReport, descriptionOfReport);
            }
        }
    });
}

function addGuildReport(guildID, userMentioned, userName, titleOfReport, descriptionOfReport) {
    AWS.config.update({
        secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
        region: process.env.region ?? process.env.envregion
    });
    const docClient = new AWS.DynamoDB.DocumentClient();
    
    var params = {
        TableName: 'reports',
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
        } //else {
        //     console.log("UpdateItem succeeded"); //JSON.stringify(data, null, 2)
        // }
    });
}