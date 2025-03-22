import { Request } from 'express';
import { Session } from 'express-session';

/**
 * Extends the express-session Session type to include our custom properties
 */
declare module 'express-session' {
  interface Session {
    accessToken?: string;
    cloudId?: string;
  }
}

export interface AuthenticatedSession extends Session {
  accessToken: string;
  cloudId: string;
}

export interface AuthenticatedRequest extends Request {
  session: AuthenticatedSession;
}