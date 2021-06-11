const { SOCKET_CONNECTION_EVENTS, CONSTANTS } = require("../Constants");
const registerMessageListeners = require("../Listeners/registerMessageListeners");
const registerUserListeners = require("../Listeners/registerUserListeners");

module.exports.connection = (io, socket) => {
  const {roomId} = socket.handshake.query;
  socket.roomId = roomId;
  const room = io.sockets.adapter.rooms.get(roomId);
  if (!room) {
    socket.join(roomId);
    registerMessageListeners(io, socket);
    registerUserListeners(io, socket);  
  } else if (room && room.size <= CONSTANTS.MAX_ROOM_PARTICIPANTS) {
    socket.join(roomId);
    registerMessageListeners(io, socket);
    registerUserListeners(io, socket);  
  } else {
    socket.emit(SOCKET_CONNECTION_EVENTS.NOT_ALLOWED, null);
    socket.leave(roomId);
  }
  socket.on(SOCKET_CONNECTION_EVENTS.DISCONNECT, () => {
    socket.leave(roomId);
  }); 
};
