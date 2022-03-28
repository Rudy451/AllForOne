const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const { instrument } = require('@socket.io/admin-ui');

const cors = require('cors');

// const { Controller } = require("./controllers");

const host = 'localhost';
const port = 3000;

const corsOptions = {
  origin: '*',
  //   methods: ['GET']
};

app.use(cors(corsOptions));
app.use(express.json());

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('join room', (roomCode) => {
    // if (roomCode === "") {
    socket.join(roomCode);
    // } else {
    //   socket.to(roomCode);
    // }

    console.log('Here is the room code', roomCode);
  });
  socket.on('room check', (roomCheck) => {
    const roomList = Array.from(io.sockets.adapter.rooms).filter((rm) => {
      return rm[0] == roomCheck;
    });
    console.log(roomList, 'list here');
    // comsole.log(roomCheck, 'roomcheck here')

    socket.join(roomList[0][0]);
  });

  socket.on('get users', async (roomCode) => {
    //this works
    // let roomSockets = [];
    // let sockets = await io.in(roomCode).fetchSockets();
    // for (const socket of sockets) {
    //   roomSockets.push(socket.id);
    // }
    // console.log(roomSockets);
    // socket.emit(roomSockets);
    //this also works
    let ids = await io.in(roomCode).allSockets();
    console.log([...ids]);

    // console.log(roomUsers);
    // socket.emit(roomUsers);
    // let userss = io.sockets.clients(roomCode);
    // console.log(userss);
    // io.in(roomCode).clients((err, clients) => {
    //   console.log(clients);
    //   // clients will be array of socket ids , currently available in given room
    // });
  });

  // let users = [];
  // socket.on('join server', (username) => {
  //   const user = {
  //     username,
  //     id: socket.id,
  //   };
  //   users.push(user);
  //   console.log('Here is the users: ', users);
  //   io.emit('new user', users);
  // });

  // socket.on('join room', (roomName) => {
  //   socket.join(roomName);
  //   socket.emit('joined room', roomName);
  //   console.log('Here is the room code', roomName);
  // });

  // socket.on('disconnect', () => {
  //   users = users.filter((u) => u.id !== socket.id);
  //   io.emit('new user', users);
  // });
});

instrument(io, { auth: false });

server.listen(port, host, () => {
  console.log(`listening on ${host}:${port}...`);
});
