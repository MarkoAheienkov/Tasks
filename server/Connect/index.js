const mongoose = require('mongoose');
const constructLocationError = require('../../Helpers/constructLocationError');
const { LOCATIONS } = require('./constants');

class MongoConnector {
  constructor(url) {
    this.client;
    this.url = url;
    this.isConnected = false;
  }

  async getConnect() {
    try {
      if (this.isConnected) {
        return this.client;
      } else {
        await this.reconnect();
        this.isConnected = true;
        return this.client;
      }
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.GET_CONNECT);
      throw locationError;
    }
  }

  async reconnect() {
    try {
      this.client = await mongoose.connect(this.url, {useNewUrlParser: true});
    } catch (err) {
      const locationError = constructLocationError(err, LOCATIONS.RECONNECT);
      throw locationError;
    }
  }

  
}

module.exports.mongoConnector = new MongoConnector(process.env.MONGO_URI);

