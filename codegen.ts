import type { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const codegenConfig: CodegenConfig = {
  schema: {
    'https://api.atlassian.com/graphql/gateway/api': {
      headers: {
        Authorization: `Bearer ${process.env.CONFLUENCE_ACCESS_TOKEN}`
      }
    }
  },
  documents: ['src/graphql/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/types/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        skipTypename: true,
        dedupeFragments: true,
        enumsAsTypes: true,
        avoidOptionals: true
      }
    }
  }
};

export default codegenConfig; 