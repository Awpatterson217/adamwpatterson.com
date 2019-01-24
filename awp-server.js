'use strict';

const express = require('express');

const {
    app: {
        host,
        port,
        getPath
    },
    mongoDB: {
        host: dbHost,
        port: dbPort
    }
} = require('./local/config');
/**
 * PM2 Interface.
 */
const pm = require('./local/lib/pm2');
/**
 * Manages connection references for convenience.
 */
const connectionManager = require('./local/lib/connection-manager');

const {
    getClient,
    MongoDBCollection
} = require('./local/lib/mongoDB');

const mongoClient = getClient({ host: dbHost, port: dbPort});

const app = express();
const { log } = console;
const publicPath = getPath(__dirname);

// Application shares a single MongoDB connection.
mongoClient.connect()
    .then((client) => {
        // Store reference to MongoDB client.
        connectionManager.setMongoDB(client);

        const { host: mHost, port: mPort} = client.topology;

        log(`\nConnected to MongoDB server running at ${mHost}:${mPort}\n`);
    })
    // Application shares a single PM2 connection.
    .then(pm.connect)
    .then(() => {
        // Store reference to PM2 Interface.
        connectionManager.setPm(pm);
    })
    .then(pm.list)
    .then((processes) => {
        processes.forEach((process) => {
            const {
                name,
                pm2_env : {
                    status,
                    pm_uptime,
                    pm_cwd
                },
                monit: {
                    memory,
                    cpu
                }
            } = process;

            log(`\nProcess ${name} is ${status}\n`);
            log(`Running from: ${pm_cwd}.\n`);
            log(`Running time: ${pm_uptime}.\n`);
            log(`Memory Usage: ${memory} bytes.\n`);
            log(`CPU Usage: ${cpu}%.\n`);
        });
    })
    .then(() => {
        const middlewareConfig = {
            publicPath,
            mongoDB: connectionManager.getMongoDB(),
            pm: connectionManager.getPm()
        };

        // Inject middleware dependencies in config.
        // EX: DB connections.
        require('./local/services')(app, middlewareConfig);

        // Application shares a single Node.js server (for now).
        const server = app.listen(port, host, () => {
            // Store reference to server.
            connectionManager.setServer(server);

            const host = server.address().address;
            const port = server.address().port;

            log(`Node.js Server running at http://${host}:${port}`);
        });
    })
    .catch((error) => {
        log({error});
    });

process.on('SIGINT', () => {
    process.emit('cleanup');
});

process.on('SIGTERM', () => {
    process.emit('cleanup');
});

process.on('cleanup', () => {
    connectionManager.gracefulExit(() => process.exit(0));
});
