const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { instrument } = require("@socket.io/admin-ui");
const { first, middle, end } = require("./names");
const cors = require("cors");

// const { Controller } = require("./controllers");

const host = "localhost";
const port = 3000;

const corsOptions = {
  origin: "*",
  //   methods: ['GET']
};

app.use(cors(corsOptions));
app.use(express.json());

//RANDOM NAME FUNCTIONS
const ranNum = () => {
  return Math.floor(Math.random() * 14);
};
const generateUserName = (first, middle, end, cb) => {
  return `${first[cb()]}${middle[cb()]}${end[cb()]}`;
};

let name = generateUserName(first, middle, end, ranNum);
//ARRAY THAT HOLDS NAMES
let users = [];
//  const addUserToRoom = (id) => {
//    if(user.id === )
//  }

//START OF SOCKETS
io.on("connection", (socket) => {
  // socket.data.username = "alice";
  // console.log(socket.data.username);
  // socket.on("join server", () => {
  //   const user = {
  //     username,
  //     id: socket.id,
  //   };
  //   console.log(user);
  //   users.push(user);
  //   console.log("Here is the users: ", users);
  //   io.emit("new user", users);

  console.log("a user connected", socket.id);
  // });

  // socket.emit("update users", () => {
  //   const user = {
  //     username: generateUserName(first, middle, end, ranNum),
  //     id: socket.id,
  //   };
  //   console.log(user);
  //   users.push(user);
  //   console.log("Here is the users: ", users);
  //   io.emit("new user", users);
  // });
  //CAPTAIN CREATE ROOM AND JOIN
  socket.on("join room", async (roomCode) => {
    socket.join(roomCode);
    const user = {
      username: name,
      id: socket.id,
    };
    users.push(user);
    console.log(name, "hi my name");

    // userNames.push(generateUserName(first, middle, end, ranNum));
    io.to(roomCode).emit("users", socket.id);
  });
  //JOIN GAME
  socket.on("room check", async (roomCheck) => {
    const roomList = Array.from(io.sockets.adapter.rooms).filter((rm) => {
      return rm[0] == roomCheck;
    });

    socket.join(roomList[0][0]);
    // let ids = await io.in(roomCheck).allSockets();
    userNames.push(generateUserName(first, middle, end, ranNum));
    io.to(roomCheck).emit("users", [...userNames]);
  });

  // socket.on("get users", async (roomCode) => {
  //   let ids = await io.in(roomCode).allSockets();
  //   console.log(ids, "IM AN ID");
  //   console.log(roomCode, "HI IM A ROOMCODE");
  //   socket.to(roomCode).emit("users", [...ids]);

  //   // socket.emit("users", [...ids]);
  // });

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
