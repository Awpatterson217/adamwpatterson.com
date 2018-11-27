'use strict';

const express = require('express');

const router = express.Router();

const services = [
    //require('/serviceOne'),
    //require('/serviceTwo')
];

services.push((req, res, next) => {
    const { originalUrl: url } = req;

    console.error(`\nService does not exist or is unavailable at ${url}\n`);

    next();
});

services.forEach(service => router.use(service));

module.exports = router;
