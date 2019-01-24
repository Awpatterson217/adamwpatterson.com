'use strict';

const redis = require('redis');

const port = 6379;
const host = '127.0.0.1';

const client = redis.createClient(port, host);

// /etc/init.d/redis-server stop
// /etc/init.d/redis-server start

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

client.set('my test key', 'my test value', redis.print);
client.get('my test key', function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('GET result ->' + result);
});
