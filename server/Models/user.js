const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    require: true,
  },
});


module.exports = model('users', userSchema);
