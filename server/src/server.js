import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import http from 'http';
import { Server } from 'socket.io';
import socketHandler from './sockets/socketHandler.js';

dotenv.config();

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

socketHandler(io);

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log('successfully connected on port', port);
    });
  })
  .catch((error) => {
    console.log('Unexpected error connecting to database', error.message);
  });





