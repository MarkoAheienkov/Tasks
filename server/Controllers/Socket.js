const disconnect = () => {
  console.log('Disconnected');
};

const message = (value) => {
  console.log(value);
};

module.exports.connection = (io, socket) => {
  socket.join('room');
  console.log(socket.adapter.rooms['room']);
  console.log('Connected');
  socket.on('disconnect', disconnect);
  socket.on('message', message);
  socket.emit('message', 'Take this')
};
