'use strict';

const pm2 = require('pm2');
const util = require('util');

const list = util.promisify(pm2.list).bind(pm2);
const connect = util.promisify(pm2.connect).bind(pm2);
const stop = util.promisify(pm2.stop).bind(pm2);
const reload = util.promisify(pm2.reload).bind(pm2);
const restart = util.promisify(pm2.restart).bind(pm2);
const start = util.promisify(pm2.start).bind(pm2);

module.exports = {
    start,
    connect,
    list,
    stop,
    reload,
    restart,
    disconnect: pm2.disconnect
};
