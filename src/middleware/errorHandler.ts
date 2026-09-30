import { Request, Response, NextFunction } from "express";

// Express calls this automatically whenever a route handler throws an error
// or calls next(err). Having ONE place that formats errors means every part
// of the app returns errors in the same shape, which makes the frontend's
// error handling simpler too.
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  console.error("[ERROR]", err);

  const status = err.status || 500;
  const message = err.message || "Something went wrong on the server.";

  res.status(status).json({ error: message });
}
