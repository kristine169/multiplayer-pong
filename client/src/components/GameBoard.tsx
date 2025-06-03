import Paddle from "./Paddle";
import Ball from "./Ball";

const GameBoard = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "500px",
        background: "black",
        margin: "50px auto",
        overflow: "hidden",
        border: "4px solid white",
      }}
    >
      <Paddle side="left" />
      <Paddle side="right" />
      <Ball />
    </div>
  );
};

export default GameBoard;