const { SOCKET_USER_EVENTS } = require("../Constants");
const Message = require("../Models/message");
const User = require("../Models/user");

module.exports = (io, socket) => {

  const userLogin = async ({ username }) => {
    try {
      let user = await User.findOne({
        username: username,
      });
      if (!user) {
        user = new User({
          username: username,
          isOnline: true,
        });
      }
      user.isOnline = true;
      await user.save();
    } catch (err) {
      console.log(err);
    }
  };

  const userLogout = async ({ username }) => {
    try {
      let user = await User.findOne({
        username: username,
      });
      if (user) {
        user.isOnline = true;
        await user.save();
      }
    } catch (err) {
      console.log(err);
    }
  };

  socket.on(SOCKET_USER_EVENTS.LOGIN, userLogin);
  socket.on(SOCKET_USER_EVENTS.LOGOUT, userLogout);
};