import React from "react";
import Paddle from "./Paddle";
import Ball from "./Ball";
import ScoreBoard from "./ScoreBoard";

const GameBoard: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "500px",
        border: "4px solid white",
        margin: "0 auto",
        background: "black",
      }}
    >
      <ScoreBoard />
      <Paddle side="left" />
      <Paddle side="right" />
      <Ball />
    </div>
  );
};

export default GameBoard;
