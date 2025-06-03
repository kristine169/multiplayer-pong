import { useEffect } from "react";
import { socket } from "./socket";
import GameBoard from "./components/GameBoard";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server. Socket ID:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <div>
      <GameBoard />
    </div>
  );
}

export default App;
