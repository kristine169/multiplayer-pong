import { useEffect, useState } from "react";
import { socket } from "../socket";

interface PaddleProps {
  side: "left" | "right";
}

const Paddle = ({ side }: PaddleProps) => {
  const [top, setTop] = useState(200);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (side === "left") {
      if (e.key === "w") setTop((prev) => Math.max(prev - 10, 0));
      if (e.key === "s") setTop((prev) => Math.min(prev + 10, 440));
    } else {
  if (e.key === "ArrowUp") setTop((prev) => Math.max(prev - 10, 0));
  if (e.key === "ArrowDown") setTop((prev) => Math.min(prev + 10, 440));
}
  };

  useEffect(() => {
    if (side === "left") {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (side === "left") {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [side]);

  // Send position to server on move
  useEffect(() => {
    if (side === "left") {
      socket.emit("move-paddle", { side, top });
    }
  }, [top, side]);

  // Listen for opponent moves
  useEffect(() => {
    socket.on("paddle-moved", ({ side: movedSide, top: newTop }) => {
      if (movedSide === side && side !== "left") {
        setTop(newTop);
      }
    });

    return () => {
      socket.off("paddle-moved");
    };
  }, [side]);

  return (
    <div
      style={{
        position: "absolute",
        width: "15px",
        height: "60px",
        background: "white",
        top: `${top}px`,
        left: side === "left" ? "0" : "785px",
      }}
    />
  );
};

export default Paddle;
