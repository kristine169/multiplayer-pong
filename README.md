# Multiplayer Pong Game 🎮

## 📖 Description

Welcome to a classic Pong remake — rebuilt as a multiplayer, real-time browser game!  
This project explores real-time communication between multiple clients using WebSockets, managed via a Node.js server and a React frontend.  

Two players can connect to a central server, control paddles on their screens, and play against each other in real-time. The ball bounces off the walls and paddles. If a player misses the ball, the opponent scores a point. The entire game state is synchronized between both browsers through Socket.IO.

---

## 🎮 How to Play

1. **Clone the project repository** or download the provided files.
2. **Open two browser tabs or devices** and connect to the same game URL.
3. **Control your paddle using keyboard keys**:
   - Player 1: `W` (Up) and `S` (Down)
   - Player 2: `Arrow Up` and `Arrow Down`
4. The ball moves automatically.  
   Your goal: prevent the ball from passing your paddle!  
   - If the ball hits your paddle: it bounces.
   - If you miss: your opponent scores.
5. The score updates in real-time on both players’ screens.

**Note:** The score only increases when the ball passes a paddle — not when it touches it.

---

## 📦 Installation & Run Instructions

### Backend (Server)
1. Navigate to the `/server` folder.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the server.

### Frontend (Client)
1. Navigate to the `/client` folder.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the React development server.

Open two browser windows/tabs at the provided localhost URL to play.

---

## 📚 Learning Objectives Covered

- **Real-Time Communication with Socket.IO**
- **Node.js Backend for Game Logic**
- **React & TypeScript Frontend Development**
- **Full-Stack TypeScript Integration**

---