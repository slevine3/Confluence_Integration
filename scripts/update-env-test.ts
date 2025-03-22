import fs from 'fs';
import readline from 'readline';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.test');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

(async () => {
  console.log('🔐 Update your test credentials for Confluence API integration\n');

  const accessToken = await prompt('Paste your access token: ');
  const cloudId = await prompt('Paste your cloud ID: ');
  const sessionSecret = process.env.SESSION_SECRET || 'keyboard cat';

  const content = `TEST_ACCESS_TOKEN=${accessToken}
TEST_CLOUD_ID=${cloudId}
SESSION_SECRET=${sessionSecret}
`;

  fs.writeFileSync(envPath, content.trim() + '\n');

  console.log(`✅ .env.test updated at: ${envPath}`);
  rl.close();
})();
