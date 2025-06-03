import { useEffect, useState } from "react";
import { socket } from "../socket";

const ScoreBoard = () => {
  const [scores, setScores] = useState({ left: 0, right: 0 });

  useEffect(() => {
    socket.on("update-scores", (data) => setScores(data));
  }, []);

  return (
    <div style={{ color: "white", textAlign: "center", fontSize: "24px" }}>
      Left: {scores.left} | Right: {scores.right}
    </div>
  );
};

export default ScoreBoard;
