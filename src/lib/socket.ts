import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

// We set this once, in server.ts, right after the HTTP server starts.
// Any other file in the project can then call getIO() to send a live
// update to connected browsers — e.g. in Milestone 5, when a job is
// assigned, we'll call getIO().to(technicianId).emit("job:assigned", job).
let io: SocketIOServer | null = null;

export function initSocket(httpServer: HttpServer): SocketIOServer {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log(`[socket] client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`[socket] client disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function getIO(): SocketIOServer {
  if (!io) {
    throw new Error("Socket.io was not initialized yet. Call initSocket() first in server.ts.");
  }
  return io;
}
