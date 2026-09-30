import jwt from "jsonwebtoken";

// This is the exact information we store inside every login token.
// Keep this small — anything in here is readable by anyone who has the
// token (though they can't fake or edit it without knowing JWT_SECRET).
export interface TokenPayload {
  userId: string;
  role: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
  // Fail loudly at startup rather than silently signing insecure tokens later.
  throw new Error("JWT_SECRET is missing from your .env file.");
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
