import { useEffect, useState } from "react";
import { socket } from "../socket";

const Ball = () => {
  const [position, setPosition] = useState({ x: 390, y: 240 });
  const [velocity, setVelocity] = useState({ x: 4, y: 4 });
  const [isHost, setIsHost] = useState(false);
  const [paddles, setPaddles] = useState({ left: 200, right: 200 });

  useEffect(() => {
    socket.on("host-assigned", (hostSocketId) => {
      setIsHost(socket.id === hostSocketId);
    });
  }, []);

  useEffect(() => {
    if (!isHost) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelocity = { ...velocity };

        // Bounce top/bottom
        if (newY <= 0) {
          newVelocity.y = Math.abs(newVelocity.y);
          newY = 0;
        } else if (newY >= 480) {
          newVelocity.y = -Math.abs(newVelocity.y);
          newY = 480;
        }

        // Left paddle collision
        if (
          newX <= 30 && // ball reaches left paddle
          newY + 20 >= paddles.left && // ball's bottom >= paddle top
          newY <= paddles.left + 80 // ball's top <= paddle bottom
        ) {
          newVelocity.x = Math.abs(newVelocity.x);
          // Add randomness to y velocity
          newVelocity.y = (Math.random() * 4 + 2) * (newVelocity.y > 0 ? 1 : -1);
          newX = 30; // prevent sticking
        }

        // Right paddle collision
        if (
          newX + 20 >= 770 && // ball reaches right paddle
          newY + 20 >= paddles.right &&
          newY <= paddles.right + 80
        ) {
          newVelocity.x = -Math.abs(newVelocity.x);
          // Add randomness to y velocity
          newVelocity.y = (Math.random() * 4 + 2) * (newVelocity.y > 0 ? 1 : -1);
          newX = 750; // prevent sticking
        }

        // Score for right
        if (newX <= 0) {
          socket.emit("goal", "left");
          newX = 390;
          newY = 240;
          newVelocity.x = 4;
          newVelocity.y = 4;
        }

        // Score for left
        if (newX >= 780) {
          socket.emit("goal", "right");
          newX = 390;
          newY = 240;
          newVelocity.x = -4;
          newVelocity.y = 4;
        }

        setVelocity(newVelocity);
        const updated = { x: newX, y: newY };
        socket.emit("update-ball", updated);
        return updated;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [velocity, paddles, isHost]);

  useEffect(() => {
    socket.on("ball-updated", (data) => setPosition(data));
    socket.on("paddle-moved", (data) => {
      setPaddles((prev) => ({ ...prev, [data.side]: data.position }));
    });
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
