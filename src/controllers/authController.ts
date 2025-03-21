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

export const handleAuthCallback = async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) return res.status(400).send('Missing code');

  const tokens = await getAccessToken(code as string);
  const cloudResources = await getCloudId(tokens.access_token);

  req.session.accessToken = tokens.access_token;
  req.session.cloudId = cloudResources[0].id;
  // req.session.refreshToken = tokens.refresh_token;
  // TODO: store access_token, refresh_token, cloudId per user (DB/session)

  res.json({
    tokens,
    cloudResources,
  });
};
