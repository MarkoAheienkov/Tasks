require('dotenv').config()
const http = require('http');
const express = require('express');
const cors = require('cors');
const {Server} = require('socket.io');
const { connection } = require('./Controllers/Socket');
const { mongoConnector } = require('./Connect');
const User = require('./Models/user');
const { SOCKET_CONNECTION_EVENTS } = require('./Constants');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 4000;

app.use(cors());

io.on(SOCKET_CONNECTION_EVENTS.CONNECT, (socket) => {
  connection(io, socket);
});

server.listen( PORT, async () => {
  await mongoConnector.getConnect();
  const users = await User.find();
  console.log('Server is listening on port', PORT);
});
