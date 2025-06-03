import React from "react";

interface PaddleProps {
  side: "left" | "right";
}

const Paddle: React.FC<PaddleProps> = ({ side }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "10px",
        height: "100px",
        background: "white",
        top: "200px",
        left: side === "left" ? "20px" : "770px",
      }}
    />
  );
};

export default Paddle;
