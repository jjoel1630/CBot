const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

module.exports = () => {
    const uri = process.env.discordbot_mongodb_uri || process.env.heroku_discordbot_mongodb_uri;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        client.close();
        console.log('connected to mongo');
    });

}