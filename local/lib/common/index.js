'use strict';

const uuid = require('uuid');

/**
 * @property {string} uuid 32 Randomly generated hexidecimal characters.
 */

/**
 * Adds uuid property to an object.
 * 
 * @function
 * @param {Object}
 * @returns {Object}
 */
function addId(dataObject) {
    const obj = {
        uuid: uuid.v4(),
        ...dataObject
    };

    return obj;
}
/**
 * Handles JSON data from buffer (file stream).
 * 
 * @function
 * @param {Buffer} data - stream of binary data.
 * @returns {Object[]}
 */
function parseBuffer(data) {
    return JSON.parse(data.toString());
}

module.exports = {
    addId,
    parseBuffer
};