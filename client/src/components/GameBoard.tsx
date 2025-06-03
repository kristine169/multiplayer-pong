import Ball from "./Ball";
import Paddle from "./Paddle";
import ScoreBoard from "./ScoreBoard";

const GameBoard = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "500px",
        background: "black",
        margin: "20px auto",
      }}
    >
      <ScoreBoard />
      <Ball />
      <Paddle side="left" />
      <Paddle side="right" />
    </div>
  );
};

export default GameBoard;
