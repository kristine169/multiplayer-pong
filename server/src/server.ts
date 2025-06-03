import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let players: { [id: string]: "left" | "right" } = {};

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // Assign player side
  const side = Object.values(players).includes("left") ? "right" : "left";
  players[socket.id] = side;
  socket.emit("assign-side", side);
  console.log(`Assigned ${side} to ${socket.id}`);

  socket.on("move-paddle", (data) => {
    socket.broadcast.emit("paddle-moved", data);
  });

  socket.on("update-ball", (data) => {
    socket.broadcast.emit("ball-updated", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected: " + socket.id);
    delete players[socket.id];
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
