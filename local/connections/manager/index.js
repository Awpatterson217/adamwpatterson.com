'use strict';

module.exports = {
  mongoDB: null,
  pm: null,
  server: null,
  setServer(server) {
    this.server = server;
  },
  getServer() {
    if (this.server) {
      return this.server;
    }

    return false;
  },
  setMongoDB(client) {
    this.mongoDB = client;
  },
  getMongoDB() {
    if (this.mongoDB) {
      return this.mongoDB;
    }

    return false;
  },
  setPm(pm) {
    this.pm = pm;
  },
  getPm() {
    if (this.pm) {
      return this.pm;
    }

    return false;
  },
  gracefulExit(callback) {
    console.log('\nCleaning up...\n');

    const host = this.server.address().address;
    const port = this.server.address().port;

    this.server.close((error) => {
      if (error) {
        console.error({ error });

        process.exit(1);
      }

      log(`Express application running at ${host}:${port} closed.`);

      this.mongoDB.close(() => {
        log('MongoDB connection closed.');

        this.pm.disconnect();

        log('PM2 connection closed.');

        callback();
      });
    });
  }
};