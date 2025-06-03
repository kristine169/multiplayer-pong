import { useEffect } from "react";
import { socket } from "./socket";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
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
      <h1 style={{ textAlign: "center", color: "white", marginTop: "20px" }}>Multiplayer Pong 🎮</h1>
      <GameBoard />
      <ScoreBoard />
    </div>
  );
}

export default App;