const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { instrument } = require("@socket.io/admin-ui");

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

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join room", (roomCode) => {
    // if (roomCode === "") {
    socket.join(roomCode);
    // } else {
    //   socket.to(roomCode);
    // }

    console.log("Here is the room code", roomCode);
  });

  socket.on("room check", (roomCheck) => {
    const roomList = Array.from(io.sockets.adapter.rooms).filter((rm) => {
      return rm[0] == roomCheck;
    });
    console.log(roomList, "list here");
    // comsole.log(roomCheck, 'roomcheck here')

    socket.join(roomList[0][0]);
  });
});

instrument(io, { auth: false });

server.listen(port, host, () => {
  console.log(`listening on ${host}:${port}...`);
});
