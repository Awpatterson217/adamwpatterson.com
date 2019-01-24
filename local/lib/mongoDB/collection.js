'use strict';

/**
 * Represents a MongoDB collection.
 * @constructor
 */
function MongoDBCollection({ client, database, collection }) {
    this.client = client;
    this.database = database;
    this.collection = collection;

    /**
     * Returns a single object by id.
     * 
     * @function
     * @param {Object} filter An object with the desired key, value to be found
     * @param {Function} callback Node.js style callback function (error, data)
     */
    this.get = (filter, callback) => {
        const dbo = this.client.db(this.database);

        dbo.collection(this.collection).find(filter).toArray((error, result) => {
            if (error) {
                callback(error);
            }

            callback(null, result);
        });
    }
    /**
     * Returns a list of objects.
     * 
     * @function
     * @param {Function} callback Node.js style callback function (error, data)
     */
    this.getAll = (callback) => {
        const dbo = this.client.db(this.database);

        dbo.collection(this.collection).find({}).toArray((error, result) => {
            if (error) {
                callback(error);
            }

            callback(null, result);
        });
    }
    /**
     * Inserts a single object.
     * 
     * @function
     * @param {Object} data
     * @param {Function} callback Node.js style callback function (error, data)
     */
    this.insert = (data, callback) => {
        const dbo = this.client.db(this.database);

        dbo.collection(this.collection).insertOne(data, function(error, result) {
            if (error) {
                callback(error);
            }

            callback(null, result);
        });
    }
}

module.exports = MongoDBCollection;