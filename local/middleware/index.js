'use strict';

const express = require('express');

module.exports = function(app, config) {
    const services = require('./services')(config);
    /**
     * Root application.
     */
    app.use(express.static(config.publicPath));
    /**
     * Microservices.
     */
    services.forEach(service => app.use('/service', service));
    /**
     * Last case scenario.
     */
    app.use((req, res, next) => {
        const { originalUrl: url } = req;

        res.status(404).send('The requested resource was not found.');
    });
    /**
     * Error Handling.
     */
    app.use((err, req, res, next) => {
        const { originalUrl: url } = req;
      
        console.error(err.stack)
      
        res.status(500).send('Server Error.');
    });
};
