'use strict';

const express = require('express');

const db = require('./local/connections/mongoDB');
const pm = require('./local/connections/pm2');
const config = require('./local/config');

const { host, port, getPublicPath } = config.app;

const publicPath = getPublicPath(__dirname);

const app = express();

require('./local/middleware')(app, publicPath);

db.connect()
    .then((client) => {
        const { host: mHost, port: mPort} = client.topology;

        console.log(`\nConnected to MongoDB server running at ${mHost}:${mPort}\n`);

        process.on('SIGINT', function() {
            client.close(true, () => {
                console.log('Database connection closed.');
            });

            process.exit(0);
         });
    })
    .then(pm.connect)
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

            console.log(`\nProcess ${name} is ${status}\n`);
            console.log(`Running from: ${pm_cwd}.\n`);
            console.log(`Running time: ${pm_uptime}.\n`);
            console.log(`Memory Usage: ${memory} bytes.\n`);
            console.log(`CPU Usage: ${cpu}%.\n`);
        })
    })
    .then(() => {
        const server = app.listen(port, host, () => {
            const host = server.address().address;
            const port = server.address().port;
            console.log(`Node.js Server running at http://${host}:${port}`);
        });
    })
    .catch((error) => {
        console.log({error});
    });
