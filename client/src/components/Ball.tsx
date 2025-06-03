import { useEffect, useState } from "react";
import { socket } from "../socket";

const Ball = () => {
  const [position, setPosition] = useState({ x: 390, y: 240 });
  const [velocity, setVelocity] = useState({ x: 3, y: 3 });
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    // Make the first tab the host
    if (!sessionStorage.getItem("isHost")) {
      sessionStorage.setItem("isHost", "true");
      setIsHost(true);
    }
  }, []);

  useEffect(() => {
    if (!isHost) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelocity = { ...velocity };

        // Bounce top and bottom
        if (newY <= 0 || newY >= 480) newVelocity.y = -newVelocity.y;

        // Bounce left and right
        if (newX <= 0 || newX >= 780) newVelocity.x = -newVelocity.x;

        setVelocity(newVelocity);

        const newPosition = { x: newX, y: newY };
        socket.emit("update-ball", newPosition);
        return newPosition;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [velocity, isHost]);

  useEffect(() => {
    const handleBallUpdated = (data: { x: number; y: number }) => {
      setPosition(data);
    };

    socket.on("ball-updated", handleBallUpdated);
    return () => {
      socket.off("ball-updated", handleBallUpdated);
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
