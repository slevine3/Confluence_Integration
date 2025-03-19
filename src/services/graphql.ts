import { GraphQLClient } from 'graphql-request';
import config from '../config';
import { oauth2 } from './oauth';

// Initialize GraphQL client
const graphqlClient = new GraphQLClient(config.graphql.apiUrl);

interface GraphQLError {
  message: string;
  locations: Array<{
    line: number;
    column: number;
  }>;
  path: string[];
}

interface GraphQLResponse<T> {
  data: T;
  errors?: GraphQLError[];
}

async function executeQuery<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  try {
    const token = await oauth2.getAccessToken();
    graphqlClient.setHeader('Authorization', `Bearer ${token}`);
    
    const response = await graphqlClient.request<GraphQLResponse<T>>(query, variables);
    const errors = response.errors || [];
    
    if (errors.length > 0) {
      // If we get an authentication error, try clearing the token and retrying once
      if (errors.some(error => error.message.toLowerCase().includes('unauthorized'))) {
        await oauth2.clearToken();
        const newToken = await oauth2.getAccessToken();
        graphqlClient.setHeader('Authorization', `Bearer ${newToken}`);
        
        const retryResponse = await graphqlClient.request<GraphQLResponse<T>>(query, variables);
        const retryErrors = retryResponse.errors || [];
        
        if (retryErrors.length > 0) {
          throw new Error(retryErrors[0].message || 'GraphQL query failed after token refresh');
        }
        return retryResponse.data;
      }
      throw new Error(errors[0].message || 'GraphQL query failed');
    }
    
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`GraphQL query failed: ${error.message}`);
    }
    throw new Error('GraphQL query failed with unknown error');
  }
}

export const graphql = {
  executeQuery
}; 