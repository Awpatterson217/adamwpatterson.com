'use strict';
/**
 * Example microservice.
 */
const express = require('express');

const router = express.router();

const sampleError = {
    type: 'ErrorType',
    message: 'Error occurred',
    messageCode: 1052
};
/**
 * Inject dependencies here.
 */
module.exports = () => {
    /**
     * Get all examples.
     */
    router.get('/example', (req, res) => {
        // res.status(200).json(data);

        res.status(500).json(sampleError);
    });
    /**
     * Get an example by UUID.
     */
    router.get('/example/:uuid', (req, res) => {
        const { uuid } = req.params;

        // res.status(200).json(data);

        res.status(500).json(sampleError);
    });
    /**
     * Create a new example.
     */
    router.post('/example', (req, res) => {
        const { example } = req.body;

        // res.status(201).send('Created');

        res.status(500).json({
            message: 'Invalid example'
        });
    });
    /**
     * Update an example.
     */
    router.put('/example', (req, res) => {
        const { example } = req.body;

        // res.status(201).send('Created');

        res.status(500).json({
            message: 'Invalid example'
        });
    });
    /**
     * Delete an example.
     */
    router.delete('/example/:uuid', (req, res) => {
        const { uuid } = req.params;

        // res.status(200).json(data);

        res.status(500).json({
            message: 'Invalid UUID'
        });
    });
}
