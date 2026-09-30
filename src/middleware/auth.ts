import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

// This middleware runs BEFORE any protected route's actual logic.
// Its only job: check that a valid login token was sent, and if so,
// attach the user's info to `req.user` so every later step can use it.
//
// See src/types/express/index.d.ts for how `req.user` becomes a known,
// type-safe property instead of TypeScript complaining it doesn't exist.
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization; // expected format: "Bearer <token>"

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No login token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next(); // token is valid, let the request continue to the real route
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired login token." });
  }
}
