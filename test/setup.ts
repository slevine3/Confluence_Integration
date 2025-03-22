import dotenv from 'dotenv';
import { app } from '../src/index';
import { Server } from 'http';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Validate required environment variables
const requiredEnvVars = ['TEST_ACCESS_TOKEN', 'TEST_CLOUD_ID'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars);
  process.exit(1);
}

// Global test server instance
let server: Server;

// Export setup and teardown functions
export const setupTestServer = async () => {
  server = app.listen(3001); // Use port 3001 for tests
};

export const teardownTestServer = async () => {
  if (server) {
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  }
};
