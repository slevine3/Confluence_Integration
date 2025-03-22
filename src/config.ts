import dotenv from 'dotenv';
import { cleanEnv, str, port } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  CONFLUENCE_DOMAIN: str(),
  CONFLUENCE_BASE_URL: str({default: 'https://api.atlassian.com/ex/confluence'}),
  CONFLUENCE_CLIENT_ID: str(),
  CONFLUENCE_CLIENT_SECRET: str(),
  AUTH_TOKEN_URL: str({ default: 'https://auth.atlassian.com/oauth/token' }),
  AUTH_RESOURCES_URL: str({ default: 'https://api.atlassian.com/oauth/token/accessible-resources' }),
  REDIRECT_URI: str(),
  REDIRECT_LOGIN: str(),
  SESSION_SECRET: str(),
  LOG_LEVEL: str({ choices: ['error', 'warn', 'info', 'debug'], default: 'info' })
});

export default {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  confluence: {
    domain: env.CONFLUENCE_DOMAIN,
    baseUrl: env.CONFLUENCE_BASE_URL,
    clientId: env.CONFLUENCE_CLIENT_ID,
    clientSecret: env.CONFLUENCE_CLIENT_SECRET
  },
  auth: {
    tokenUrl: env.AUTH_TOKEN_URL,
    resourcesUrl: env.AUTH_RESOURCES_URL,
    redirectUri: env.REDIRECT_URI,
    redirectLogin: env.REDIRECT_LOGIN,
    sessionSecret: env.SESSION_SECRET
  },
  logging: {
    level: env.LOG_LEVEL
  }
} as const; 