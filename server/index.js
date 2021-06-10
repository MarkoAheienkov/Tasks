require('dotenv').config()
const http = require('http');
const express = require('express');
const cors = require('cors');
const {Server} = require('socket.io');
const { connection } = require('./Controllers/Socket');
const { mongoConnector } = require('./Connect');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 3000;

app.use(cors());

io.on('connection', (socket) => {
  connection(io, socket);
});

server.listen( PORT, async () => {
  await mongoConnector.getConnect();
  console.log('Server is listening on port', PORT);
});
