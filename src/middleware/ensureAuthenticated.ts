import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import config from '../config';

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): asserts req is AuthenticatedRequest {
  const { accessToken, cloudId } = req.session || {};

  if (accessToken && cloudId) {
    return next();
  }

  if (process.env.NODE_ENV === 'test') {
    res.status(401).json({ message: 'Unauthorized. Please log in via /oauth.' });
    return;
  }
  
  res.redirect(config.auth.redirectLogin);
  return;
}
