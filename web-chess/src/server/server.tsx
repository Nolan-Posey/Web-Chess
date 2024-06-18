import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
  pingInterval: 10000,
  pingTimeout: 5000, 
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('move', (data) => {
    try {
      socket.broadcast.emit('move', data);
    } catch (error) {
      console.error('Error handling move:', error);
    }
  });

  socket.on('reset', () => {
    try {
      socket.broadcast.emit('reset');
    } catch (error) {
      console.error('Error handling reset:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});