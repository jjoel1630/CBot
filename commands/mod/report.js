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
            
            const userMentioned = message.mentions.users.first().id;
            const [ titleOfReport, descriptionOfReport ] = args[1].split(',');

            var userHasReports = getUserReports(userMentioned);
            console.log(userHasReports);
            // if(userHasReports) {
            //     updateEntry(userMentioned, titleOfReport, descriptionOfReport);
            // } else {
            //     addNewReportAndUser(titleOfReport, descriptionOfReport, userMentioned);
            // }
        }
    }
}

function updateEntry(userMentioned, titleOfReport, descriptionOfReport) {
    AWS.config.update(
        process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        process.env.accessKeyId ?? process.env.envaccessKeyId,
        process.env.region ?? process.env.envregion
    );
    var dynamodb = new AWS.DynamoDB({ region: 'us-east-2' });
    const docClient = new AWS.DynamoDB.DocumentClient({ service: dynamodb });
    
    var params = {
        TableName: 'reports',
        Key:{
            "userID": userMentioned,
        },
        UpdateExpression: "SET #reports = list_append(#reports, :age)",
        ExpressionAttributeNames: {
            "#reports": "reports"
         },
        ExpressionAttributeValues:{
            ":newreport": {
                title: titleOfReport,
                description: descriptionOfReport
            }
        },
        ReturnValues:"UPDATED_NEW"
    };
    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });

}

function getUserReports(userMentioned) {
    AWS.config.update(
        process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        process.env.accessKeyId ?? process.env.envaccessKeyId,
        process.env.region ?? process.env.envregion
    );
    var dynamodb = new AWS.DynamoDB({ region: 'us-east-2' });
    const docClient = new AWS.DynamoDB.DocumentClient({ service: dynamodb });
    
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
            console.log('success');
            const { Items } = data;
            return({
                success: true,
                data: Items
            });
        }
    });
}

function addNewReportAndUser(titleOfReport, descriptionOfReport, userMentioned) {
    AWS.config.update(
        process.env.secretAccessKey ?? process.env.envsecretAccessKey,
        process.env.accessKeyId ?? process.env.envaccessKeyId,
        process.env.region ?? process.env.envregion
    );
    var dynamodb = new AWS.DynamoDB({ region: 'us-east-2' });
    const docClient = new AWS.DynamoDB.DocumentClient({ service: dynamodb });
    
    var params = {
        TableName: 'report',
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
        } else {
            console.log({
                success: true,
                message: 'Added element',
                data: data
            });
        }
    });
}