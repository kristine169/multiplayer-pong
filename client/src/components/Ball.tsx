import { useEffect, useState } from "react";
import { socket } from "../socket";

const Ball = () => {
  const [position, setPosition] = useState({ x: 400, y: 250 });
  const [velocity, setVelocity] = useState({ x: 3, y: 3 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelocity = { ...velocity };

        // Bounce off top/bottom walls
        if (newY <= 0 || newY >= 480) {
          newVelocity.y = -newVelocity.y;
        }

        // Bounce off left/right walls (or you can count scores here)
        if (newX <= 0 || newX >= 780) {
          newVelocity.x = -newVelocity.x;
        }

        setVelocity(newVelocity);
        const updatedPosition = { x: newX, y: newY };

        socket.emit("update-ball", updatedPosition);

        return updatedPosition;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [velocity]);
const [isBallOwner, setIsBallOwner] = useState(false);

useEffect(() => {
  socket.on("ball-owner", ({ isOwner }) => {
    setIsBallOwner(isOwner);
  });

  return () => {
    socket.off("ball-owner");
  };
}, []);

useEffect(() => {
  if (!isBallOwner) return;

  const interval = setInterval(() => {
    // Ball moving logic here
  }, 30);

  return () => clearInterval(interval);
}, [isBallOwner, velocity]);

  // Listen for ball updates
  useEffect(() => {
    socket.on("ball-updated", (data) => {
      setPosition(data);
    });

    return () => {
      socket.off("ball-updated");
    };
  }, []);


  return (
    <div
      style={{
        position: "absolute",
        width: "20px",
        height: "20px",
        background: "white",
        borderRadius: "50%",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default Ball;
