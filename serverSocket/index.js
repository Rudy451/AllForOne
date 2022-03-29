const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
<<<<<<< HEAD
const { instrument } = require("@socket.io/admin-ui");
const { first, middle, end } = require("./names");
const cors = require("cors");
=======
const { instrument } = require('@socket.io/admin-ui');

const cors = require('cors');
>>>>>>> 1836925f3243042726fec1a34364117f92c38919

// const { Controller } = require("./controllers");

const host = 'localhost';
const port = 3000;

const corsOptions = {
  origin: '*',
  //   methods: ['GET']
};

app.use(cors(corsOptions));
app.use(express.json());

<<<<<<< HEAD
//RANDOM NAME FUNCTIONS
const ranNum = () => {
  return Math.floor(Math.random() * 14);
};
const generateUserName = (first, middle, end, cb) => {
  return `${first[cb()]}${middle[cb()]}${end[cb()]}`;
};
//ARRAY THAT HOLDS NAMES
let userNames = [];

//START OF SOCKETS
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  //CAPTAIN CREATE ROOM AND JOIN
  socket.on("join room", async (roomCode) => {
    console.log(roomCode, "roomcade server side");
=======
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('join room', (roomCode) => {
    // if (roomCode === "") {
>>>>>>> 1836925f3243042726fec1a34364117f92c38919
    socket.join(roomCode);
    userNames.push(generateUserName(first, middle, end, ranNum));
    io.to(roomCode).emit("users", [...userNames]);
  });
<<<<<<< HEAD
  //JOIN GAME
  socket.on("room check", async (roomCheck) => {
=======
  socket.on('room check', (roomCheck) => {
>>>>>>> 1836925f3243042726fec1a34364117f92c38919
    const roomList = Array.from(io.sockets.adapter.rooms).filter((rm) => {
      return rm[0] == roomCheck;
    });

    socket.join(roomList[0][0]);
    // let ids = await io.in(roomCheck).allSockets();
    userNames.push(generateUserName(first, middle, end, ranNum));
    io.to(roomCheck).emit("users", [...userNames]);
  });

<<<<<<< HEAD
  // socket.on("get users", async (roomCode) => {
  //   let ids = await io.in(roomCode).allSockets();
  //   console.log(ids, "IM AN ID");
  //   console.log(roomCode, "HI IM A ROOMCODE");
  //   socket.to(roomCode).emit("users", [...ids]);

  //   // socket.emit("users", [...ids]);
  // });

=======
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
    socket.emit('users', [...ids]);
    // console.log([...ids]);
    // let userss = io.sockets.clients(roomCode);
    // console.log(userss);
    // io.in(roomCode).clients((err, clients) => {
    //   console.log(clients);
    //   // clients will be array of socket ids , currently available in given room
    // });
  });

>>>>>>> 1836925f3243042726fec1a34364117f92c38919
  // let users = [];
  // socket.on("update users", (username, amount) => {
  //   const user = {
  //     username,
  //     amount,
  //     id: socket.id,
  //   };
  //   users.push(user);
  //   console.log("Here is the users: ", users);
  //   io.emit("new user", users);
  // });

  // socket.on('join room', (roomName) => {
  //   socket.join(roomName);
  //   socket.emit('joined room', roomName);
  //   console.log('Here is the room code', roomName);
  // });

  // socket.on('disconnect', () => {
  //   users = users.filter((u) => u.id !== socket.id);
  //   io.emit('new user', users);
  // io.emit('user disconnected')
  // });
});

instrument(io, { auth: false });

server.listen(port, host, () => {
  console.log(`listening on ${host}:${port}...`);
});
