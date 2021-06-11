const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    require: true,
  },
  isOnline: {
    type: Schema.Types.Boolean,
    require: true,
    default: false,
  },
});


module.exports = model('users', userSchema);
