import { useEffect, useState } from "react";
import { socket } from "../socket";

interface PaddleProps {
  side: "left" | "right";
}

const Paddle = ({ side }: PaddleProps) => {
  const [top, setTop] = useState(200);
  const [playerSide, setPlayerSide] = useState<string | null>(null);

  useEffect(() => {
    // Listen for side assignment
    socket.on("assign-side", (assignedSide: string) => {
      console.log(`Assigned side: ${assignedSide}`);
      setPlayerSide(assignedSide);
    });

    return () => {
      socket.off("assign-side");
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (playerSide !== side) return;

      if (side === "left") {
        if (e.key === "w") setTop((prev) => Math.max(prev - 10, 0));
        if (e.key === "s") setTop((prev) => Math.min(prev + 10, 440));
      } else if (side === "right") {
        if (e.key === "ArrowUp") setTop((prev) => Math.max(prev - 10, 0));
        if (e.key === "ArrowDown") setTop((prev) => Math.min(prev + 10, 440));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerSide, side]);

  useEffect(() => {
    if (playerSide === side) {
      socket.emit("move-paddle", { side, top });
    }
  }, [top, side, playerSide]);

  useEffect(() => {
    const handlePaddleMoved = (data: { side: string; top: number }) => {
      if (data.side === side && playerSide !== side) {
        setTop(data.top);
      }
    };

    socket.on("paddle-moved", handlePaddleMoved);
    return () => {
      socket.off("paddle-moved", handlePaddleMoved);
    };
  }, [side, playerSide]);

  return (
    <div
      style={{
        position: "absolute",
        width: "15px",
        height: "60px",
        background: "white",
        top: `${top}px`,
        left: side === "left" ? "0px" : "785px",
      }}
    />
  );
};

export default Paddle;
