import React, { useEffect, useState } from "react";
import Ball from "./Ball";
import Paddle from "./Paddle";
import ScoreBoard from "./ScoreBoard";
import { socket } from "../socket";

const GameBoard = () => {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    socket.on("game-started", () => {
      setGameStarted(true);
    });

    socket.on("game-over", (data) => {
      setGameStarted(false);
      alert(`Game Over! Winner: ${data.winner}`);
    });

    return () => {
      socket.off("game-started");
      socket.off("game-over");
    };
  }, []);

  const handleStartGame = () => {
    socket.emit("start-game");
  };

  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "500px",
        background: "black",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <ScoreBoard />
      <Paddle side="left" />
      <Paddle side="right" />
      {gameStarted && <Ball />}
      {!gameStarted && (
        <button
          onClick={handleStartGame}
          style={{
            position: "absolute",
            top: "220px",
            left: "350px",
            padding: "12px 20px",
            fontSize: "18px",
            background: "white",
            color: "black",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Start button
        </button>
      )}
    </div>
  );
};

export default GameBoard;
