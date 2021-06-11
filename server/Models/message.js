const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
  roomId: {
    type: Schema.Types.String,
    require: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    require: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    require: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  text: {
    type: Schema.Types.String,
    require: true,
  },
});


module.exports = model('messages', messageSchema);
