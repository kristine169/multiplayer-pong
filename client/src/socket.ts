import { io } from "socket.io-client";

const URL = "http://localhost:3000"; // backend server URL
export const socket = io(URL, { transports: ["websocket"] });
