const { model, Schema } = require('mongoose');

const roomSchema = new Schema({
  roomId: {
    type: Schema.Types.String,
    require: true,
  },
  users: {
    type: Schema.Types.Array,
  },
});


module.exports = model('rooms', roomSchema);
