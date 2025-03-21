import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth'; // adjust path as needed

declare module 'express-session' {
  interface Session {
    accessToken?: string;
    cloudId?: string;
  }
}

/**
 * Middleware that asserts req is AuthenticatedRequest if session has required values
 */
export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): asserts req is AuthenticatedRequest {
  if (!req.session?.accessToken || !req.session?.cloudId) {
    res.status(401).json({ message: 'Unauthorized. Please log in via /oauth.' });
    return;
  }

  next();
}
