'use strict';
/**
 * Process management API with PM2.
 */
const express = require('express');

const router = express.router();

const sampleError = {
    type: 'ErrorType',
    message: 'Error occurred',
    messageCode: 1052
};

/**
 * Depends on PM2 interface.
 */
module.exports = ({ pm }) => {
    /**
     * Get all running processes.
     */
    router.get('/process', (req, res) => {

        // res.status(200).json(data);

        res.status(500).json(sampleError);
    });
    /**
     * Get a running process by UUID.
     */
    router.get('/process/:uuid', (req, res) => {
        const { uuid } = req.params;

        // res.status(200).json(data);

        res.status(500).json(sampleError);
    });
    /**
     * Create a new process.
     */
    router.post('/process', (req, res) => {
        const { process } = req.body;
    
        // res.status(201).send('Created');

        res.status(500).json({
            message: 'Invalid process'
        });
    });
    /**
     * Update a currently existing process.
     */
    router.put('/process', (req, res) => {
        const { process } = req.body;

        // res.status(201).send('Created');

        res.status(500).json({
            message: 'Invalid process'
        });
    });
    /**
     * Delete a process by UUID.
     */
    router.delete('/process/:uuid', (req, res) => {
        const { uuid } = req.params;

        // res.status(200).json(data);

        res.status(500).json({
            message: 'Invalid UUID'
        });
    });
}
