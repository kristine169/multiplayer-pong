import React from "react";

const ScoreBoard: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        top: "10px",
        color: "white",
        fontSize: "24px",
        textAlign: "center",
      }}
    >
      0 : 0
    </div>
  );
};

export default ScoreBoard;
