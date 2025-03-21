import dotenv from 'dotenv';
import { cleanEnv, str, port } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  CONFLUENCE_DOMAIN: str(),
  CONFLUENCE_CLIENT_ID: str(),
  CONFLUENCE_CLIENT_SECRET: str(),
  AUTH_TOKEN_URL: str({ default: 'https://auth.atlassian.com/oauth/token' }),
  REDIRECT_URI: str(),
  SESSION_SECRET: str(),
  LOG_LEVEL: str({ choices: ['error', 'warn', 'info', 'debug'], default: 'info' })
});

export default {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  confluence: {
    domain: env.CONFLUENCE_DOMAIN,
    clientId: env.CONFLUENCE_CLIENT_ID,
    clientSecret: env.CONFLUENCE_CLIENT_SECRET
  },
  auth: {
    tokenUrl: env.AUTH_TOKEN_URL,
    redirectUri: env.REDIRECT_URI,
    sessionSecret: env.SESSION_SECRET
  },
  logging: {
    level: env.LOG_LEVEL
  }
} as const; 