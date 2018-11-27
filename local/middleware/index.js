'use strict';

const express = require('express');

const services = require('./services');

module.exports = function(app, publicPath) {
    app.use(express.static(publicPath));

    app.use('/service', services);

    app.use((req, res, next) => {
        const { originalUrl: url } = req;

        res.status(404).send('The requested resource was not found.');
    });

    app.use((err, req, res, next) => {
        const { originalUrl: url } = req;
      
        console.error(err.stack)
      
        res.status(500).send('Server Error.');
    });
};
