import { Request, Response } from 'express';
import config from '../config';
import { getAccessToken, getCloudId } from '../services';

export const redirectToAtlassian = (req: Request, res: Response) => {
  const params = new URLSearchParams({
    audience: 'api.atlassian.com',
    client_id: config.confluence.clientId,
    scope: 'read:page:confluence read:space:confluence',
    redirect_uri: config.auth.redirectUri,
    response_type: 'code',
    prompt: 'consent',
  });

  const authUrl = `https://auth.atlassian.com/authorize?${params.toString()}`;
  res.redirect(authUrl);
};

export const handleAuthCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
      res.status(400).json({ message: 'Missing or invalid code parameter' });
      return;
    }

    const tokens = await getAccessToken(code);
    const cloudResources = await getCloudId(tokens.access_token);

    req.session.accessToken = tokens.access_token;
    req.session.cloudId = cloudResources[0].id;

    res.json({ tokens, cloudResources });
  } catch (error: any) {
    console.error('OAuth callback error:', error.message);
    res.status(500).json({ message: 'Failed to complete OAuth flow', error: error.message });
  }
};