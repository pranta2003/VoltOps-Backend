import { Request, Response, NextFunction } from "express";

// This is the actual "role-based access control" rule enforcer.
//
// IMPORTANT PRINCIPLE FOR THIS WHOLE PROJECT:
// The frontend hides buttons a role shouldn't see, purely for a clean UI.
// But hiding a button does NOT stop someone from calling the API directly
// (e.g. with Postman) and pretending to be an Admin. This middleware is
// the REAL security check — it runs on the backend, where the user can't
// tamper with it.
//
// Usage example in a route file:
//   router.delete("/users/:id", requireAuth, authorize("ADMIN"), deleteUser);
// This means: must be logged in AND must have the ADMIN role, or the
// request is rejected before it ever reaches the deleteUser logic.
export function authorize(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      // This should never happen if requireAuth ran first, but we check
      // anyway rather than assuming.
      return res.status(401).json({ error: "Not authenticated." });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Your role (${req.user.role}) is not allowed to do this.`,
      });
    }

    next();
  };
}
