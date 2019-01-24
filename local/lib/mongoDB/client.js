const MongoClient = require('mongodb').MongoClient;

module.exports = ({ host, port }) => {
    return {
        connect: () => {
            const MONGO_URL = `mongodb://${host}:${port}`;

            return MongoClient.connect(MONGO_URL, {
                useNewUrlParser: true,
                appname: 'adamwpatterson.com'
            })
        }
    }
}
