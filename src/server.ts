import dotenv from "dotenv";
dotenv.config(); // must run before anything that reads process.env (like jwt.ts)

import http from "http";
import { createApp } from "./app";
import { initSocket } from "./lib/socket";

const PORT = process.env.PORT || 5000;

const app = createApp();
const httpServer = http.createServer(app); // needed so both Express AND Socket.io can share the same server
initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`VoltOps API running at http://localhost:${PORT}`);
  console.log(`Health check:      http://localhost:${PORT}/api/health`);
});
