import { useEffect, useState } from "react";
import { socket } from "../socket";

interface Props {
  side: "left" | "right";
}

const Paddle: React.FC<Props> = ({ side }) => {
  const [position, setPosition] = useState(200);
  const [mySide, setMySide] = useState<string | null>(null);

  useEffect(() => {
    socket.on("assign-side", (assigned) => setMySide(assigned));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mySide !== side) return;

      let newPosition = position;
      if (side === "left") {
        if (e.key === "w" && position > 0) newPosition -= 20;
        if (e.key === "s" && position < 420) newPosition += 20;
      }
      if (side === "right") {
        if (e.key === "ArrowUp" && position > 0) newPosition -= 20;
        if (e.key === "ArrowDown" && position < 420) newPosition += 20;
      }

      if (newPosition !== position) {
        setPosition(newPosition);
        socket.emit("move-paddle", { side, position: newPosition });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [position, mySide, side]);

  useEffect(() => {
    socket.on("paddle-moved", (data) => {
      if (data.side === side) {
        setPosition(data.position);
      }
    });
  }, [side]);

  return (
    <div
      style={{
        position: "absolute",
        width: "10px",
        height: "80px",
        background: "white",
        left: side === "left" ? "20px" : "770px",
        top: `${position}px`,
      }}
    />
  );
};

export default Paddle;
