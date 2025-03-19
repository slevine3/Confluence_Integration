import axios from 'axios';
import config from '../config';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope?: string;
}

interface TokenInfo {
  accessToken: string;
  expiresAt: number;
}

let currentToken: TokenInfo | null = null;

async function getAccessToken(): Promise<string> {
  if (currentToken && Date.now() < currentToken.expiresAt) {
    return currentToken.accessToken;
  }

  try {
    const response = await axios.post<TokenResponse>(
      config.auth.tokenUrl,
      {
        grant_type: 'client_credentials',
        client_id: config.confluence.clientId,
        client_secret: config.confluence.clientSecret,
        audience: config.confluence.domain
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data.access_token) {
      throw new Error('Access token not found in response');
    }

    // Store token with expiry (subtract 60 seconds for safety margin)
    currentToken = {
      accessToken: response.data.access_token,
      expiresAt: Date.now() + (response.data.expires_in - 60) * 1000
    };

    return currentToken.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid client credentials');
      }
      throw new Error(`OAuth2 authentication failed: ${error.response?.data?.error_description || error.message}`);
    }
    throw new Error('Failed to obtain access token');
  }
}

async function clearToken(): Promise<void> {
  currentToken = null;
}

export const oauth2 = {
  getAccessToken,
  clearToken
}; 