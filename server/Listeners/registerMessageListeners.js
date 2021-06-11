const Message = require("../Models/message");

module.exports = (io, socket) => {

  const getMessages = async () => {
    try {
      const messages = await Message.find().sort({ craetedAt: 1 });
      io.in(socket.roomId).emit('message:get', messages);
    } catch(err) {
      console.log(err);
    }
  };

  const addMessage = async ({text, createdAt, author}) => {
    try {
      console.log(text);
      const message = new Message({
        author: author,
        createdAt: createdAt,
        text: text,
        roomId: socket.roomId,
      });
      await message.save();
      await getMessages();
    } catch (err) {
      console.log(err);
    }
  };

  socket.on('message:add', addMessage);
  socket.on('message:get', getMessages);
};