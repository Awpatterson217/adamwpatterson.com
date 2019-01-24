'use strict';

const path = require('path');

const env = process.env.NODE_ENV;

const development = {
  app: {
    host: 'localhost',
    port: 3000,
    getPath: root => path.join(root, 'dist')
  },
  mongoDB: {
    host: 'localhost',
    port: 27017,
    name: 'test'
  }
}; 

const production = {
  app: {
    host: process.env.APP_HOST,
    port: parseInt(process.env.APP_PORT),
    getPath: root => path.join(root, 'dist')
  },
  mongoDB: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    name: process.env.DB_NAME
  },
  redis: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    name: process.env.DB_NAME
  }
};

const config = {
  development,
  production
};

module.exports = config[env];
