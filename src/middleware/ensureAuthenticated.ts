import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  interface Session {
    accessToken?: string;
    cloudId?: string;
  }
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !req.session.accessToken || !req.session.cloudId) {
    return res.status(401).json({ message: 'Unauthorized. Please log in via /oauth.' });
  }

  next();
}
