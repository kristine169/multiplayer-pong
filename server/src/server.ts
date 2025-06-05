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
let hostId: string | null = null;

io.on("connection", (socket) => {
  console.log("A user connected:" + socket.id);

  // Assign side
  const side = Object.values(players).includes("left") ? "right" : "left";
  players[socket.id] = side;
  socket.emit("assign-side", side);
  console.log(`${socket.id} is ${side}`);

  // Assign host if none
  if (!hostId) {
    hostId = socket.id;
    io.emit("host-assigned", hostId);
    console.log(`Host assigned: ${hostId}`);
  } else {
    // Inform new client who is host
    socket.emit("host-assigned", hostId);
  }

  socket.on("start-game", () => {
    // Reset scores on new game start
    scores = { left: 0, right: 0 };
    io.emit("update-scores", scores);
    io.emit("game-started");
  });

  socket.on("move-paddle", (data) => {
    io.emit("paddle-moved", data);
  });

  socket.on("update-ball", (data) => {
    // Only accept ball updates from host
    if (socket.id === hostId) {
      io.emit("ball-updated", data);
    }
  });

  socket.on("goal", (data) => {
    if (data === "left") scores.right += 0.25;
    else if (data === "right") scores.left += 0.25;
    io.emit("update-scores", scores);

    if (scores.left >= 5) {
      io.emit("game-over", { winner: "left" });
    } else if (scores.right >= 5) {
      io.emit("game-over", { winner: "right" });
    }
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    console.log("disconnected:", socket.id);

    // Reassign host if host disconnected
    if (socket.id === hostId) {
      const remainingPlayers = Object.keys(players);
      hostId = remainingPlayers.length > 0 ? remainingPlayers[0] : null;
      io.emit("host-assigned", hostId);
      console.log(`Host reassigned: ${hostId}`);
    }
  });
});

server.listen(3000, () => console.log("Server on 3000"));
