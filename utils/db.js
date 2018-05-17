require('envdotjs').load();
import envdotjs from 'envdotjs';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
let isConnected;

const connectToDatabase = () => {
  if (isConnected) {
    return Promise.resolve();
  }
  return mongoose
    .connect(
      'mongodb://tbaustin:password@ds141406.mlab.com:41406/salsify-test-api'
    )
    .then(db => {
      isConnected = db.connections[0].readyState;
    });
};

module.exports = {
  connectToDatabase
};
