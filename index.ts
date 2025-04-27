import http from 'http';
import { Server, Socket } from 'socket.io';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT
const db = process.env.DB as string

mongoose.connect(db)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const httpServer = http.createServer(); 

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected:', socket.id);

  socket.on("login", (username : string, password : string) => {
    (username === "krel" && password === "123") ? socket.emit("loginSuccess") : socket.emit("loginFailed")
  })


});

httpServer.listen(port, () => {
  console.log('Socket.IO server running at http://localhost:' + port);
});

