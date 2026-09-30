import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

export function createApp() {
  const app = express();

  // Allow the frontend (a different port/domain) to call this API.
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true,
    })
  );

  app.use(express.json()); // lets us read JSON request bodies as req.body

  // Simple route to quickly confirm the server is alive (visit it in a browser).
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "VoltOps API is running." });
  });

  app.use("/api", routes);

  // Catch requests to routes that don't exist.
  app.use((req, res) => {
    res.status(404).json({ error: `No route found for ${req.method} ${req.path}` });
  });

  // Must be registered LAST — Express only treats a middleware as an error
  // handler if it has exactly these 4 parameters.
  app.use(errorHandler);

  return app;
}
