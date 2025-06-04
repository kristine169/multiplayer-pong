import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

let players: Record<string, "left" | "right"> = {};
let scores = { left: 0, right: 0 };

io.on("connection", (socket) => {
  console.log("A user connected:" + socket.id);
  socket.on("start-game", () => {
    io.emit("game-started");
  });
  const side = Object.values(players).includes("left") ? "right" : "left";
  players[socket.id] = side;
  socket.emit("assign-side", side);
  console.log(`${socket.id} is ${side}`);

  socket.on("move-paddle", (data) => {
    io.emit("paddle-moved", data);
  });

  socket.on("update-ball", (data) => {
    io.emit("ball-updated", data);
  });

  socket.on("goal", (data) => {
    if (data === "left") scores.right++;
    else if (data === "right") scores.left++;
    io.emit("update-scores", scores);
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    console.log("disconnected:", socket.id);
  });
});

server.listen(3000, () => console.log("Server on 3000"));
