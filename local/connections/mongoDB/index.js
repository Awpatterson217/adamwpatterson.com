'use strict';

const MongoClient = require('mongodb').MongoClient;

const MONGO_URL = 'mongodb://127.0.0.1:27017';
// const MONGO_URL = `mongodb://${HOST}:${PORT}`;

module.exports = {
    connect: () => {
        return MongoClient.connect(MONGO_URL, {
            useNewUrlParser: true,
            appname: 'adamwpatterson.com'
        })
    }
}
