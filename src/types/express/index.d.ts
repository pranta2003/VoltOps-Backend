// By default, Express's Request type has no idea what "req.user" is,
// because we invented that property ourselves in auth.ts. Without this
// file, TypeScript would show an error everywhere we write "req.user".
//
// This file "merges" our TokenPayload shape into Express's built-in
// Request type, so req.user is fully typed (autocomplete works, typos
// like req.usr are caught) everywhere in the project.

import { TokenPayload } from "../../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};
