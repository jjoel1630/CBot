const humanizeDuration = require('humanize-duration')
const AWS = require('aws-sdk');

const cooldowns = new Map();

AWS.config.update({
    secretAccessKey: process.env.secretAccessKey ?? process.env.envsecretAccessKey,
    accessKeyId: process.env.accessKeyId ?? process.env.envaccessKeyId,
    region: process.env.region ?? process.env.envregion
});
const docClient = new AWS.DynamoDB.DocumentClient();


module.exports = {
    name: 'Todo List',
    description: 'you can add items to your todo list',
    aliases: ['todo'],
    perms: 'ADMINISTRATOR',
    active: true,
    usage: '`$todo <command (add, delete, get)> date time title, description`',
    cooldownTime: 60000,
    execute(message=message, args=args, bot=bot, Discord=Discord) {
        const cooldown = cooldowns.get(message.author.id);
        if(cooldown && !message.author.id === '535671100001222668') {
            const remaining = humanizeDuration(cooldown - Date.now(), {units: ['m', 's'], round: true});
            message.channel.send(`chill bruva. you can run this command in ` + remaining)
        } else {

            todo(message, args);
            
            cooldowns.set(message.author.id, Date.now() + this.cooldownTime);
            setTimeout(() => cooldowns.delete(message.author.id), this.cooldownTime);
        }
    }
}

const todo = (message, args) => {
    const guildID = message.guild.id;
    
    if(args[0] === 'get' && args[1] === 'server') {
        getGuildTodos(guildID, message);
        return;
    } else if(args[0] === 'delete' && args[1]) {
        deleteTodo(message, args);
        return;
    }

    var dateOfTodo = args[1];
    var timeOfTodo = args[2];

    args.shift();
    args.shift();
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
    const  descriptionOfTodo = argsTitle.join(' ');
    const titleOfTodo = args.join(' ');

    checkGuildTodos(message, guildID, dateOfTodo, titleOfTodo, descriptionOfTodo, timeOfTodo);
}

function checkGuildTodos(message, guildID, dateOfTodo, titleOfTodo, descriptionOfTodo, timeOfTodo) {
    const params = {
        TableName: 'guildSettings',
        FilterExpression: "guildID = :gID",
        ExpressionAttributeValues: {
            ":gID": guildID
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

            if(Items[0]?.todos) {
                addGuildTodo(message, guildID, titleOfTodo, descriptionOfTodo, dateOfTodo, timeOfTodo);
            } else if(!Items[0]) {
                addGuildAndTodo(message, guildID, titleOfTodo, descriptionOfTodo, dateOfTodo, timeOfTodo);
            } else {
                addTodoDoc(message, guildID, titleOfTodo, descriptionOfTodo, dateOfTodo, timeOfTodo);
            }
        }
    });
}

function addTodoDoc(message, guildID, titleOfTodo, descriptionOfTodo, dateOfTodo, timeOfTodo) {
    var params = {
        TableName: 'guildSettings',
        Key: {
            "guildID": guildID
        },
        UpdateExpression: 'set todos = :todo',
        ExpressionAttributeValues: {
            ':todo' : [
                {
                    title: titleOfTodo,
                    description: descriptionOfTodo,
                    time: timeOfTodo,
                    date: dateOfTodo
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
            message.channel.send('added new todo');
        }
    });
}

function addGuildAndTodo(message, guildID, titleOfTodo, descriptionOfTodo, dateOfTodo, timeOfTodo) {
    var params = {
        TableName: 'guildSettings',
        Item: {
            guildID: guildID,
            todos: [
                {
                    title: titleOfTodo,
                    description: descriptionOfTodo,
                    time: timeOfTodo,
                    date: dateOfTodo
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
            message.channel.send('added new todo');
        }
    });
}

function getGuildTodos(guildID, message) {
    const params = {
        TableName: 'guildSettings',
        ProjectionExpression:"#todos",
        FilterExpression: "guildID = :gID",
        ExpressionAttributeValues: {
            ":gID": guildID
        },
        ExpressionAttributeNames: {
            "#todos": "todos",
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
            var todoString = 'Todos for this server:';
            Items[0].todos.forEach(todo => {
                todoString = `${todoString}\n**Todo #${i}** - \`Title: ${todo.title}\`, \`Description: ${todo.description}\`, \`Date: ${todo.date}\`, \`Time: ${todo.time}\``
                i++;
            });

            if(todoString === `Todos for this server:`) {
                message.channel.send('no todos for this server');
                return;
            }

            message.channel.send(todoString);
        }
    });
}

function addGuildTodo(message, guildID, titleOfTodo, descriptionOfTodo, dateOfTodo,  timeOfTodo) {
    var params = {
        TableName: 'guildSettings',
        Key:{
            "guildID": guildID,
        },
        UpdateExpression: "SET #todos = list_append(#todos, :todo)",
        ExpressionAttributeNames: {
            "#todos": "todos"
        },
        ExpressionAttributeValues:{
            ":todo": [
                {
                    title: titleOfTodo,
                    description: descriptionOfTodo,
                    time: timeOfTodo,
                    date: dateOfTodo
                }
            ]
        },
        ReturnValues:"UPDATED_NEW"
    };

    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            message.channel.send('added new todo'); //JSON.stringify(data, null, 2)
        }
    });
}

function deleteTodo(message, args) {
    var index = args[1] - 1;
    var params = {
        TableName: 'guildSettings',
        Key:{
            "guildID": message.guild.id,
        },
        UpdateExpression: `REMOVE todos[${index}]`,
        // ConditionExpression: ":age >= :limitAge",
        // ExpressionAttributeValues:{
        //     ":index": args[1]
        // },
        ReturnValues:"UPDATED_NEW"
    };
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to delete the todo. Check to see if that was the correct todo number");
        } else {
            message.channel.send('deleted todo');
            // console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}