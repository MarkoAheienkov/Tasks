const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  text: {
    type: Schema.Types.String,
    require: true,
  },
  author: {
    type: Schema.Types.String,
    required: true,
  }
});


module.exports = model('messages', messageSchema);
