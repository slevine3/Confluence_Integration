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

/**
 * Represents a session that has been authenticated with both accessToken and cloudId
 */
export interface AuthenticatedSession extends Session {
  accessToken: string;
  cloudId: string;
}

/**
 * Extends Express Request type to include our authenticated session
 */
export interface AuthenticatedRequest extends Request {
  session: AuthenticatedSession;
}

/**
 * Type guard to check if a session is authenticated
 */
export function isAuthenticated(session: Session): session is AuthenticatedSession {
  return Boolean(session.accessToken && session.cloudId);
} 